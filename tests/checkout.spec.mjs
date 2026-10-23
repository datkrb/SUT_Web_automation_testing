// Checkout tests use the seeded account and real catalog through the UI.
// Oracle: EShop SRS FR-08 / FR-09 and observed checkout UI.
import { test as base, expect } from 'playwright/test';

const API = 'http://localhost:3000/api';
const ACCOUNT = { email: 'test@eshop.com', password: 'Test1234!', name: 'Test User' };

const test = base.extend({
  product: async ({ request }, use) => {
    const response = await request.get(`${API}/products`);
    expect(response.ok(), 'Fixture: the real product API must be available').toBeTruthy();
    const products = await response.json();
    expect(products.length, 'Fixture: at least one product must exist').toBeGreaterThan(0);
    expect(Number.isSafeInteger(Number(products[0].price)) && Number(products[0].price) > 0,
      'Fixture: the selected product must have a positive integer price').toBe(true);
    await use(products[0]);
  },
});

const main = page => page.getByRole('main');
const checkoutTotal = page => main(page).getByRole('spinbutton');
const couponCode = page => main(page).getByRole('textbox', { name: /Nhập mã giảm giá/ });
const applyCoupon = page => main(page).getByRole('button', { name: 'Áp dụng', exact: true });
const amountFrom = text => Number(text.replace(/[^\d-]/g, ''));

async function signIn(page) {
  await page.goto('/login');
  const fields = page.locator('form input');
  await fields.nth(0).fill(ACCOUNT.email);
  await fields.nth(1).fill(ACCOUNT.password);
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();
  await expect(page).toHaveURL('http://localhost:5180/');
  await expect(page.getByRole('link', { name: `Chào, ${ACCOUNT.name}`, exact: true })).toBeVisible();
}

async function addProductFromHome(page, product) {
  await page.goto('/');
  await expect(main(page).getByRole('heading', { name: 'Danh sách sản phẩm', exact: true })).toBeVisible();
  const card = main(page).locator('div').filter({
    has: page.getByRole('heading', { name: product.name, exact: true }),
  }).filter({ has: page.getByRole('link', { name: 'Xem chi tiết', exact: true }) });
  await card.last().getByRole('button', { name: 'Thêm vào giỏ', exact: true }).click();
}

async function openCheckout(page, product) {
  await signIn(page);
  await addProductFromHome(page, product);
  await page.getByRole('link', { name: 'Giỏ hàng', exact: true }).click();
  await expect(page).toHaveURL(/\/cart$/);
  await expect(main(page).getByRole('row').filter({ hasText: product.name })).toHaveCount(1);
  await main(page).getByRole('button', { name: 'Tiến hành thanh toán', exact: true }).click();
  await expect(page).toHaveURL(/\/checkout$/);
  await expect(main(page).getByRole('heading', { name: 'Xác Nhận Đơn Hàng', exact: true })).toBeVisible();
}

test.describe('Thanh toán', () => {
  test('guest-must-sign-in-before-checkout', async ({ page, product }) => {
    await addProductFromHome(page, product);
    await page.getByRole('link', { name: 'Giỏ hàng', exact: true }).click();
    await expect(page).toHaveURL(/\/cart$/);

    const dialogPromise = page.waitForEvent('dialog');
    await main(page).getByRole('button', { name: 'Tiến hành thanh toán', exact: true }).click();
    const dialog = await dialogPromise;
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toBe('Bạn cần đăng nhập để thanh toán!');
    await dialog.accept();
    await expect(page).toHaveURL(/\/login$/);
  });

  test('checkout-shows-cart-product-and-total', async ({ page, product }) => {
    await openCheckout(page, product);

    const orderItem = main(page).getByRole('listitem');
    await expect(orderItem).toHaveCount(1);
    await expect(orderItem).toContainText(
      new RegExp(`${product.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s+x\\s+1`),
    );
    const displayedPrice = await page.evaluate(price => price.toLocaleString(), Number(product.price));
    await expect(orderItem).toContainText(`${displayedPrice} ₫`);
    await expect(checkoutTotal(page)).toHaveValue(String(product.price));
    await expect(main(page).getByRole('button', { name: 'Xác Nhận Thanh Toán', exact: true })).toBeVisible();
  });

  test('checkout-total-is-not-editable', async ({ page, product }) => {
    await openCheckout(page, product);

    // FR-08: the amount must be computed from the cart and not directly editable.
    await expect(checkoutTotal(page)).not.toBeEditable();
  });

  test('rejects-unknown-coupon', async ({ page, product }) => {
    await openCheckout(page, product);
    await couponCode(page).fill('KHONGTONTAI');
    await applyCoupon(page).click();

    await expect(main(page).getByText('Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa', { exact: true })).toBeVisible();
  });

  test('rejects-expired-coupon', async ({ page, product }) => {
    await openCheckout(page, product);
    await couponCode(page).fill('EXPIRED');
    await applyCoupon(page).click();

    await expect(main(page).getByText('Mã giảm giá đã hết hạn', { exact: true })).toBeVisible();
  });

  test('applies-seeded-percent-coupon', async ({ page, product }) => {
    await openCheckout(page, product);
    await couponCode(page).fill('SAVE10');
    await applyCoupon(page).click();

    await expect(main(page).getByText('Áp dụng thành công! Giảm 10%', { exact: true })).toBeVisible();
    const savings = main(page).getByText(/Tiết kiệm:/);
    const finalAmount = main(page).getByText(/Thành tiền:/);
    await expect.poll(async () => amountFrom(await savings.innerText())).toBe(
      Math.floor(Number(product.price) * 0.1),
    );
    await expect.poll(async () => amountFrom(await finalAmount.innerText())).toBe(
      Number(product.price) - Math.floor(Number(product.price) * 0.1),
    );
  });
});
