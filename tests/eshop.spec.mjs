// EShop SRS: FR-02, FR-07, FR-08; password masking: FR-22.
// Test plan and AI generation workflow: README.md.
import { test as base, expect } from 'playwright/test';
import { randomUUID } from 'node:crypto';


const API = 'http://localhost:3000/api';
const PRODUCT = 'iPhone 15 Pro Max';
const test = base.extend({
  account: async ({ request }, use) => {
    const account = { name: 'Playwright fixture', email: `pw-${randomUUID()}@example.test`, password: 'Playwright123!' };
    const response = await request.post(`${API}/register`, { data: account });
    expect(response.ok(), 'Test-account setup must succeed').toBeTruthy();
    await use(account);
  },
});

async function submitLogin(page, account) {
  await page.goto('/login');
  // The supplied SUT has labels without for/id associations; scope the fallback to this form.
  await page.locator('form input').nth(0).fill(account.email);
  await page.locator('form input').nth(1).fill(account.password);
  const response = page.waitForResponse(r => r.url().endsWith('/api/login') && r.request().method() === 'POST');
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();
  return response;
}

async function signIn(page, account) {
  expect((await submitLogin(page, account)).ok()).toBeTruthy();
  await expect(page).toHaveURL('http://localhost:5180/');
  await expect(page.getByRole('link', { name: `Chào, ${account.name}`, exact: true })).toBeVisible();
}

function productCard(page) {
  return page.locator('main div.border').filter({
    has: page.getByRole('heading', { name: PRODUCT, exact: true }),
  });
}

function productRows(page) {
  return page.getByRole('row').filter({ has: page.getByRole('cell', { name: PRODUCT, exact: true }) });
}

function money(value) {
  return `${Number(value).toLocaleString('vi-VN')} ₫`;
}

async function productPrice(request) {
  const response = await request.get(`${API}/products`);
  expect(response.ok(), 'Product fixture must be available').toBeTruthy();
  const products = await response.json();
  const product = products.find(item => item.id === 1 && item.name === PRODUCT);
  expect(product, 'Expected seeded product ID 1').toBeTruthy();
  return Number(product.price);
}

async function addProduct(page) {
  await page.goto('/');
  await productCard(page).getByRole('button', { name: 'Thêm vào giỏ', exact: true }).click();
  // SPA navigation preserves the in-memory cart; a full page.goto('/cart') would reset it.
  await page.getByRole('link', { name: 'Giỏ hàng', exact: true }).click();
  await expect(productRows(page)).toHaveCount(1);
}

async function openCheckout(page, account) {
  await signIn(page, account);
  await addProduct(page);
  await page.getByRole('button', { name: 'Tiến hành thanh toán', exact: true }).click();
  await expect(page).toHaveURL(/\/checkout$/);
  await expect(page.getByRole('heading', { name: 'Xác Nhận Đơn Hàng', exact: true })).toBeVisible();
}

// Đăng nhập: xem kế hoạch tương ứng trong README.md.
test.describe('Đăng nhập', () => {
  test('email-format-validation', async ({ page }) => {
    // 1. Mở form đăng nhập và kiểm tra kiểu email theo FR-02.
    await page.goto('/login');
    const email = page.locator('form input').nth(0);
    await expect(email).toHaveAttribute('type', 'email');
    // 2. Nhập email sai định dạng: HTML5 phải đánh dấu typeMismatch.
    await email.fill('invalid-email');
    expect(await email.evaluate(element => element.validity.typeMismatch)).toBe(true);
  });

  test('lock-expires-after-thirty-seconds', async ({ page, account }) => {
    // 1. Nhập sai ba lần để kích hoạt khóa tài khoản.
    for (let attempt = 0; attempt < 3; attempt++) {
      const response = await submitLogin(page, { ...account, password: 'WrongPassword123!' });
      expect(response.status()).toBeGreaterThanOrEqual(400);
      expect(response.status()).toBeLessThan(500);
    }
    // 2. FR-02 quy định 30 giây thực; đây không phải đợi UI hay giả lập clock trình duyệt.
    await new Promise(resolve => setTimeout(resolve, 31000));
    // 3. Nhập đúng sau khi hết khóa: phải đăng nhập được.
    expect((await submitLogin(page, account)).ok(), 'FR-02: lock must expire after 30 seconds').toBeTruthy();
    await expect(page).toHaveURL('http://localhost:5180/');
  });

  test('locked-after-three-failures', async ({ page, account }) => {
    // 1. Nhập sai ba lần liên tiếp.
    for (let attempt = 0; attempt < 3; attempt++) {
      const response = await submitLogin(page, { ...account, password: 'WrongPassword123!' });
      expect(response.status()).toBeGreaterThanOrEqual(400);
      expect(response.status()).toBeLessThan(500);
    }
    // 2. Nhập đúng ngay: tài khoản vẫn bị khóa.
    const response = await submitLogin(page, account);
    expect(response.status()).toBeGreaterThanOrEqual(400);
    expect(response.status()).toBeLessThan(500);
    await expect(page).toHaveURL(/\/login$/);
    expect(await page.evaluate(() => localStorage.getItem('token'))).toBeNull();
  });

  test('not-locked-after-two-failures', async ({ page, account }) => {
    // 1. Đăng nhập sai đúng hai lần; chưa đủ ngưỡng khóa FR-02.
    for (let attempt = 0; attempt < 2; attempt++) {
      const response = await submitLogin(page, { ...account, password: 'WrongPassword123!' });
      expect(response.status()).toBeGreaterThanOrEqual(400);
      expect(response.status()).toBeLessThan(500);
    }
    // 2. Nhập đúng: phải đăng nhập được.
    expect((await submitLogin(page, account)).ok(), 'FR-02: two failures must not lock the account').toBeTruthy();
    await expect(page).toHaveURL('http://localhost:5180/');
  });

  test('password-masking', async ({ page }) => {
    // 1. Mở Login: trường mật khẩu phải che ký tự.
    await page.goto('/login');
    await expect(page.locator('form input').nth(1)).toHaveAttribute('type', 'password');
  });

  test('reject-unknown-email', async ({ page, account }) => {
    // 1. Nhập email chưa đăng ký.
    const response = await submitLogin(page, { ...account, email: `unknown-${account.email}` });
    // 2. Kiểm tra lỗi chung không tiết lộ tài khoản và không cấp token.
    expect(response.status()).toBeGreaterThanOrEqual(400);
    expect(response.status()).toBeLessThan(500);
    await expect(page.getByText('Đăng nhập thất bại. Vui lòng kiểm tra lại.', { exact: true })).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem('token'))).toBeNull();
  });

  test('reject-wrong-password', async ({ page, account }) => {
    // 1. Nhập email đã đăng ký và mật khẩu sai.
    const response = await submitLogin(page, { ...account, password: 'WrongPassword123!' });
    // 2. Kiểm tra bị từ chối, lỗi chung, không token, vẫn ở Login.
    expect(response.status()).toBeGreaterThanOrEqual(400);
    expect(response.status()).toBeLessThan(500);
    await expect(page.getByText('Đăng nhập thất bại. Vui lòng kiểm tra lại.', { exact: true })).toBeVisible();
    await expect(page).toHaveURL(/\/login$/);
    expect(await page.evaluate(() => localStorage.getItem('token'))).toBeNull();
  });

  test('valid-login', async ({ page, account }) => {
    // 1. Nhập đúng email/mật khẩu và gửi form.
    await signIn(page, account);
    // 2. Kiểm tra token được cấp, cùng với URL và greeting đã kiểm tra trong signIn.
    await expect.poll(() => page.evaluate(() => localStorage.getItem('token'))).toMatch(/^[^.]+\.[^.]+\.[^.]+$/);
  });
});

// Giỏ hàng: xem kế hoạch tương ứng trong README.md.
test.describe('Giỏ hàng', () => {
  test('add-single-product', async ({ page, request }) => {
    // 1. Thêm một sản phẩm từ Home và mở Cart bằng link.
    const price = await productPrice(request);
    await addProduct(page);
    // 2. Kiểm tra số lượng và thành tiền của một dòng.
    const cells = productRows(page).getByRole('cell');
    await expect(cells.nth(2)).toHaveText('1');
    await expect(cells.nth(1)).toHaveText(money(price));
    await expect(cells.nth(3)).toHaveText(money(price));
  });

  test('adjust-quantity', async ({ page, request }) => {
    // 1. Thêm một sản phẩm và kiểm tra có controls +/- theo FR-07.
    const price = await productPrice(request);
    await addProduct(page);
    const row = productRows(page);
    const increase = row.getByRole('button', { name: '+', exact: true });
    const decrease = row.getByRole('button', { name: '-', exact: true });
    await expect(increase, 'FR-07 requires quantity increase control').toBeVisible();
    await expect(decrease, 'FR-07 requires quantity decrease control').toBeVisible();
    // 2. Tăng lên 2 rồi giảm về 1, kiểm tra thành tiền cả hai lần.
    await increase.click();
    await expect(row.getByRole('cell').nth(2)).toHaveText('2');
    await expect(row.getByRole('cell').nth(3)).toHaveText(money(price * 2));
    await decrease.click();
    await expect(row.getByRole('cell').nth(2)).toHaveText('1');
    await expect(row.getByRole('cell').nth(3)).toHaveText(money(price));
  });

  test('confirm-before-removing', async ({ page }) => {
    // 1. Thêm sản phẩm; bắt native confirm nếu có, hủy lần đầu và chấp nhận lần sau.
    await addProduct(page);
    let confirmations = 0;
    let accept = false;
    page.on('dialog', async dialog => {
      if (dialog.type() === 'confirm') confirmations++;
      if (accept) await dialog.accept();
      else await dialog.dismiss();
    });
    await page.getByRole('button', { name: 'Xóa', exact: true }).click();
    // 2. Chấp nhận native confirm hoặc accessible custom dialog, không chấp nhận xóa ngay.
    const dialog = page.getByRole('dialog');
    await expect.poll(async () => confirmations + await dialog.count(), { message: 'FR-07 requires deletion confirmation' }).toBeGreaterThan(0);
    if (await dialog.count()) await dialog.getByRole('button', { name: /^(Hủy|Cancel)$/i }).click();
    await expect(productRows(page)).toHaveCount(1);
    // 3. Xóa lần nữa và xác nhận: giỏ phải trống.
    accept = true;
    await page.getByRole('button', { name: 'Xóa', exact: true }).click();
    if (await dialog.count()) await dialog.getByRole('button', { name: /^(Xóa|Xác nhận|Delete|Confirm)$/i }).click();
    await expect(page.getByRole('heading', { name: 'Giỏ hàng của bạn đang trống', exact: true })).toBeVisible();
  });

  test('correct-total-label', async ({ page, request }) => {
    // 1. Thêm một sản phẩm rồi đọc tổng tiền.
    const price = await productPrice(request);
    await addProduct(page);
    // 2. FR-07 yêu cầu nhãn Tổng cộng và giá trị tương ứng.
    await expect(page.getByText(`Tổng cộng: ${money(price)}`, { exact: true })).toBeVisible();
  });

  test('empty-cart', async ({ page }) => {
    // 1. Mở giỏ hàng trong context mới.
    await page.goto('/cart');
    // 2. Kiểm tra empty state và đường quay lại mua sắm.
    await expect(page.getByRole('heading', { name: 'Giỏ hàng của bạn đang trống', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Tiếp tục mua sắm', exact: true })).toHaveAttribute('href', '/');
  });

  test('merge-duplicate-product', async ({ page }) => {
    // 1. Thêm một sản phẩm, quay lại Home trong cùng SPA và thêm lần nữa.
    await addProduct(page);
    await page.getByRole('link', { name: 'EShop', exact: true }).click();
    await productCard(page).getByRole('button', { name: 'Thêm vào giỏ', exact: true }).click();
    // 2. FR-07: gộp thành một dòng có quantity 2.
    await page.getByRole('link', { name: 'Giỏ hàng', exact: true }).click();
    await expect(productRows(page)).toHaveCount(1);
    await expect(productRows(page).getByRole('cell').nth(2)).toHaveText('2');
  });
});

// Thanh toán: xem kế hoạch tương ứng trong README.md.
test.describe('Thanh toán', () => {
  test('guest-checkout-api-rejected', async ({ request }) => {
    // 1. Gửi checkout không token; backend phải bảo vệ endpoint.
    const response = await request.post(`${API}/checkout`, {
      data: { items: [{ id: 1, quantity: 1 }], total_amount: 30000000 },
    });
    // 2. Hợp đồng API hiện tại trả 401 khi chưa xác thực.
    expect(response.status()).toBe(401);
  });

  test('guest-checkout-ui-rejected', async ({ page }) => {
    // 1. Chưa đăng nhập, thêm một sản phẩm và bấm thanh toán.
    await addProduct(page);
    page.on('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'Tiến hành thanh toán', exact: true }).click();
    // 2. FR-08: yêu cầu đăng nhập trước khi thanh toán.
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole('button', { name: 'Sign In', exact: true })).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem('token'))).toBeNull();
  });

  test('order-summary', async ({ page, account, request }) => {
    // 1. Đăng nhập, thêm một sản phẩm và mở Checkout.
    const price = await productPrice(request);
    await openCheckout(page, account);
    // 2. Kiểm tra tên, số lượng, thành tiền đúng với giỏ.
    await expect(page.getByRole('listitem')).toHaveCount(1);
    await expect(page.getByRole('listitem')).toHaveText(`${PRODUCT} x 1 — ${money(price)}`);
    await expect(page.getByText(`Tổng thanh toán: ${money(price)}`, { exact: true })).toBeVisible();
  });

  test('read-only-total', async ({ page, account, request }) => {
    // 1. Đăng nhập, có một sản phẩm và mở Checkout.
    const price = await productPrice(request);
    await openCheckout(page, account);
    // 2. FR-08: tổng tự tính và không chỉnh trực tiếp được.
    const total = page.getByRole('spinbutton');
    await expect(total).toHaveValue(String(price));
    await expect(total, 'FR-08: checkout total must not be editable').not.toBeEditable();
  });

  test('server-recalculates-total', async ({ page, account, request }) => {
    // 1. Đăng nhập thật qua UI và lấy giá chuẩn từ backend.
    const price = await productPrice(request);
    await signIn(page, account);
    const token = await page.evaluate(() => localStorage.getItem('token'));
    const headers = { Authorization: `Bearer ${token}` };
    // 2. Cố gửi tổng và giá giả. FR-08: backend không được tin giá client.
    const response = await request.post(`${API}/checkout`, {
      headers,
      data: { items: [{ id: 1, quantity: 1, price: 1 }], total_amount: 1 },
    });
    // 3. Có thể từ chối request 4xx; nếu chấp nhận, đơn phải lưu tổng tự tính từ giá server.
    if (response.status() >= 400 && response.status() < 500) return;
    expect(response.ok()).toBeTruthy();
    const { orderId } = await response.json();
    const ordersResponse = await request.get(`${API}/orders/my-orders`, { headers });
    expect(ordersResponse.ok()).toBeTruthy();
    const order = (await ordersResponse.json()).find(item => item.id === orderId);
    expect(order).toBeTruthy();
    expect(Number(order.total_amount), 'FR-08: server must recalculate the product price').toBe(price);
  });

  test('successful-checkout-clears-cart', async ({ page, account, request }) => {
    // 1. Mở Checkout và thanh toán qua UI với tổng tiền đúng.
    const price = await productPrice(request);
    await openCheckout(page, account);
    const pending = page.waitForResponse(response => response.url().endsWith('/api/checkout') && response.request().method() === 'POST');
    await page.getByRole('button', { name: 'Xác Nhận Thanh Toán', exact: true }).click();
    const response = await pending;
    expect(response.ok()).toBeTruthy();
    const { orderId } = await response.json();
    await expect(page.getByRole('heading', { name: 'Thanh toán thành công!', exact: true })).toBeVisible();
    // 2. Đọc lại đơn của đúng user để kiểm tra đã lưu tổng đúng.
    const token = await page.evaluate(() => localStorage.getItem('token'));
    const ordersResponse = await request.get(`${API}/orders/my-orders`, { headers: { Authorization: `Bearer ${token}` } });
    expect(ordersResponse.ok()).toBeTruthy();
    const order = (await ordersResponse.json()).find(item => item.id === orderId);
    expect(order).toBeTruthy();
    expect(Number(order.total_amount)).toBe(price);
    // 3. FR-08: quay lại giỏ trong cùng SPA; không reload vì có thể che lỗi chưa clear cart.
    await page.getByRole('link', { name: 'Giỏ hàng', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Giỏ hàng của bạn đang trống', exact: true })).toBeVisible();
    await expect(page.getByRole('row')).toHaveCount(0);
  });
});
