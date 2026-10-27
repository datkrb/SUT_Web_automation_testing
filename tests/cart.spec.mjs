// Shopping cart tests: GH-01 to GH-15.
// Oracle: local EShop SRS FR-07, related FR-23 / FR-24.
import { test as base, expect } from 'playwright/test';

const test = base.extend({
  catalog: async ({ request }, use) => {
    const response = await request.get('http://localhost:3000/api/products');
    expect(response.ok(), 'Fixture: real product API must be available').toBeTruthy();
    const products = (await response.json()).filter(p => Number.isSafeInteger(Number(p.price)) && Number(p.price) > 0);
    expect(products.length, 'Fixture: at least two products with valid prices').toBeGreaterThanOrEqual(2);
    await use(products.slice(0, 2));
  },
  products: async ({ catalog }, use) => {
    await use(catalog.slice(0, 2));
  },
});

const main = page => page.getByRole('main');
const rows = page => main(page).locator('tbody tr');
const rowFor = (page, product) => rows(page).filter({ has: page.getByRole('cell', { name: product.name, exact: true }) });
const cartLink = page => page.locator('header a[href="/cart"]');
const emptyMessage = page => main(page).getByRole('heading', { name: 'Giỏ hàng của bạn đang trống' });
// Check amount and label separately.
const totalAmount = page => main(page).getByText(/Tổng (?:cộng|tạm tính):/).locator('span');
const numberFrom = text => Number(text.replace(/[^\d-]/g, ''));

async function expectMoney(locator, amount) {
  await expect(locator).toContainText('₫');
  await expect.poll(async () => numberFrom(await locator.innerText())).toBe(amount);
}

async function expectQuantity(row, quantity) {
  const cell = row.getByRole('cell').nth(2);
  const input = cell.getByRole('spinbutton');
  if (await input.count()) await expect(input).toHaveValue(String(quantity));
  else await expect(cell).toHaveText(String(quantity));
}

async function home(page) {
  await page.goto('/');
  await expect(main(page).getByRole('heading', { name: 'Danh sách sản phẩm', exact: true })).toBeVisible();
}

async function addFromHome(page, product) {
  // Add products through the Home UI.
  const card = main(page).locator('div').filter({
    has: page.getByRole('heading', { name: product.name, exact: true }),
  }).filter({ has: page.getByRole('link', { name: 'Xem chi tiết', exact: true }) });
  await card.last().getByRole('button', { name: 'Thêm vào giỏ', exact: true }).click();
}

async function openCart(page) {
  // Client navigation preserves the in-memory cart; goto/reload would reset it.
  await cartLink(page).click();
  await expect(page).toHaveURL(/\/cart$/);
}

async function populate(page, products) {
  await home(page);
  for (const product of products) await addFromHome(page, product);
  await openCart(page);
  await expect(rows(page)).toHaveCount(products.length);
}

// Support both native confirm and an accessible custom confirmation dialog.
async function remove(page, product, accept, requireConfirmation = true) {
  let nativeType;
  page.once('dialog', async dialog => {
    nativeType = dialog.type();
    if (accept) await dialog.accept();
    else await dialog.dismiss();
  });
  await rowFor(page, product).getByRole('button', { name: /Xóa/ }).click();
  const dialog = page.getByRole('dialog').or(page.getByRole('alertdialog'));
  if (requireConfirmation) {
    await expect.poll(async () => nativeType === 'confirm' || await dialog.isVisible(),
      { message: 'FR-07 / FR-24: deleting requires a confirmation dialog' }).toBe(true);
  }
  if (await dialog.isVisible()) {
    await dialog.getByRole('button', { name: accept ? /^(Xóa|Xác nhận|Đồng ý|OK)$/i : /^(Hủy|Cancel)$/i }).click();
  }
}

test.describe('Giỏ hàng', () => {
  test('empty-cart-state', async ({ page }) => {
    // GH-01
    await page.goto('/cart');
    await expect(emptyMessage(page)).toBeVisible();
    await expect(rows(page)).toHaveCount(0);
    await expect(main(page).locator('img, svg, [role="img"], .material-icons, .material-symbols-outlined, i[class*="fa-"]').first()).toBeVisible();
  });

  test('empty-cart-continue-shopping', async ({ page }) => {
    // GH-02
    await page.goto('/cart');
    await main(page).getByRole('link', { name: 'Tiếp tục mua sắm', exact: true }).click();
    await expect(page).toHaveURL('http://localhost:5180/');
    await expect(main(page).getByRole('heading', { name: 'Danh sách sản phẩm', exact: true })).toBeVisible();
  });

  test('add-product-from-home', async ({ page, products }) => {
    // GH-03
    await populate(page, [products[0]]);
    const cells = rowFor(page, products[0]).getByRole('cell');
    await expect(cells.nth(0)).toHaveText(products[0].name);
    await expectMoney(cells.nth(1), Number(products[0].price));
    await expectQuantity(rowFor(page, products[0]), 1);
    await expectMoney(cells.nth(3), Number(products[0].price));
  });

  test('cart-column-headings', async ({ page, products }) => {
    // GH-04
    await populate(page, [products[0]]);
    await expect(main(page).getByRole('columnheader')).toHaveText(['Sản phẩm', 'Đơn giá', 'Số lượng', 'Thành tiền', 'Thao tác']);
  });

  test('merge-duplicate-product', async ({ page, products }) => {
    // GH-05
    await home(page);
    await addFromHome(page, products[0]);
    await addFromHome(page, products[0]);
    await openCart(page);
    await expect(rows(page)).toHaveCount(1);
    const cells = rowFor(page, products[0]).getByRole('cell');
    await expectQuantity(rowFor(page, products[0]), 2);
    await expectMoney(cells.nth(3), Number(products[0].price) * 2);
    await expectMoney(totalAmount(page), Number(products[0].price) * 2);
  });

  test('sum-distinct-products', async ({ page, products }) => {
    // GH-06
    await populate(page, products);
    for (const product of products) {
      await expectMoney(rowFor(page, product).getByRole('cell').nth(3), Number(product.price));
    }
    await expectMoney(totalAmount(page), products.reduce((sum, p) => sum + Number(p.price), 0));
  });

  test('total-label', async ({ page, products }) => {
    // GH-07
    await populate(page, [products[0]]);
    await expect(main(page).getByText(/^Tổng cộng:/)).toBeVisible();
    await expect(main(page).getByText(/^Tổng tạm tính:/)).toHaveCount(0);
  });

  test('increase-quantity', async ({ page, products }) => {
    // GH-08
    await populate(page, [products[0]]);
    const row = rowFor(page, products[0]);
    const increase = row.getByRole('button', { name: /^(\+|Tăng|Tăng số lượng)$/i });
    await expect(increase).toBeVisible();
    await increase.click();
    await expectQuantity(row, 2);
    await expectMoney(row.getByRole('cell').nth(3), Number(products[0].price) * 2);
    await expectMoney(totalAmount(page), Number(products[0].price) * 2);
  });

  test('decrease-quantity', async ({ page, products }) => {
    // GH-09
    await populate(page, [products[0]]);
    const row = rowFor(page, products[0]);
    const increase = row.getByRole('button', { name: /^(\+|Tăng|Tăng số lượng)$/i });
    await expect(increase).toBeVisible();
    await increase.click();
    await increase.click();
    await row.getByRole('button', { name: /^(-|−|Giảm|Giảm số lượng)$/i }).click();
    await expectQuantity(row, 2);
    await expectMoney(row.getByRole('cell').nth(3), Number(products[0].price) * 2);
    await expectMoney(totalAmount(page), Number(products[0].price) * 2);
  });

  test('cancel-product-removal', async ({ page, products }) => {
    // GH-10
    await populate(page, [products[0]]);
    await remove(page, products[0], false);
    await expect(rowFor(page, products[0])).toHaveCount(1);
    await expectMoney(totalAmount(page), Number(products[0].price));
  });

  test('confirm-product-removal', async ({ page, products }) => {
    // GH-11
    await populate(page, products);
    await remove(page, products[0], true);
    await expect(rowFor(page, products[0])).toHaveCount(0);
    await expect(rowFor(page, products[1])).toHaveCount(1);
    await expectMoney(totalAmount(page), Number(products[1].price));
  });

  test('remove-last-product-shows-empty-state', async ({ page, products }) => {
    // GH-12
    await populate(page, [products[0]]);
    await remove(page, products[0], true, false);
    await expect(emptyMessage(page)).toBeVisible();
    await expect(rows(page)).toHaveCount(0);
  });

  test('continue-shopping-retains-cart', async ({ page, products }) => {
    // GH-13
    await populate(page, [products[0]]);
    await main(page).getByRole('link', { name: /Mua tiếp|Tiếp tục mua sắm/ }).click();
    await expect(page).toHaveURL('http://localhost:5180/');
    await addFromHome(page, products[1]);
    await openCart(page);
    await expect(rows(page)).toHaveCount(2);
    for (const product of products) await expect(rowFor(page, product)).toHaveCount(1);
  });

  test('cart-badge-updates', async ({ page, products }) => {
    // GH-14
    await home(page);
    await addFromHome(page, products[0]);
    await expect(cartLink(page)).toContainText(/\b1\b/);
    await addFromHome(page, products[1]);
    await expect(cartLink(page)).toContainText(/\b2\b/);
    await openCart(page);
    await remove(page, products[0], true, false);
    await expect(cartLink(page)).toContainText(/\b1\b/);
  });

  test('cart-breadcrumb-navigation', async ({ page, products }) => {
    // GH-15
    await populate(page, [products[0]]);
    const breadcrumb = page.getByRole('navigation', { name: /breadcrumb|đường dẫn/i });
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb).toContainText(/Giỏ hàng/i);
    const homeLink = breadcrumb.getByRole('link', { name: /Trang chủ|Home/i });
    await homeLink.click();
    await expect(page).toHaveURL('http://localhost:5180/');
    await openCart(page);
    await expectQuantity(rowFor(page, products[0]), 1);
  });
});
