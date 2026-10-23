// Designed after live exploration with skills/playwright-cli/SKILL.md.
// Oracle: local EShop SRS FR-07, related FR-06 / FR-23 / FR-24.
import { test as base, expect } from 'playwright/test';

const test = base.extend({
  catalog: async ({ request }, use) => {
    const response = await request.get('http://localhost:3000/api/products');
    expect(response.ok(), 'Fixture: real product API must be available').toBeTruthy();
    const products = (await response.json()).filter(p => Number.isSafeInteger(Number(p.price)) && Number(p.price) > 0);
    expect(products.length, 'Fixture: at least three products with valid prices').toBeGreaterThanOrEqual(3);
    await use(products.slice(0, 3));
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
// Locate the amount independently of the incorrect label, which has its own test.
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
  // Use the working Home entry point so the product-detail first-click bug
  // does not block independent FR-07 checks. Never seed React/storage state.
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

async function openProduct(page, product) {
  await expect(main(page).getByRole('heading', { name: 'Danh sách sản phẩm', exact: true })).toBeVisible();
  await main(page).locator(`a[href="/product/${product.id}"]`).click();
  await expect(main(page).getByRole('heading', { name: product.name, exact: true })).toBeVisible();
}

async function expectAddFeedback(page) {
  const toast = page.locator('[role="status"], [role="alert"], .Toastify__toast, [data-sonner-toast]')
    .filter({ hasText: /đã thêm|thành công|added/i });
  await expect.poll(async () => /\b1\b/.test(await cartLink(page).innerText()) || await toast.first().isVisible(),
    { message: 'FR-06 / FR-24: adding must show a toast or update the cart badge' }).toBe(true);
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
  test('empty-cart-message', async ({ page }) => {
    // GH-01: a fresh browser context has an empty cart and a clear message.
    await page.goto('/cart');
    await expect(emptyMessage(page)).toBeVisible();
    await expect(rows(page)).toHaveCount(0);
    await expect(main(page).getByRole('button', { name: 'Tiến hành thanh toán' })).toHaveCount(0);
  });

  test('empty-cart-illustration', async ({ page }) => {
    // GH-02: FR-07 / FR-24 require an illustration or icon in the empty state.
    await page.goto('/cart');
    await expect(emptyMessage(page)).toBeVisible();
    await expect(main(page).locator('img, svg, [role="img"], .material-icons, .material-symbols-outlined, i[class*="fa-"]').first()).toBeVisible();
  });

  test('empty-cart-continue-shopping', async ({ page }) => {
    // GH-03
    await page.goto('/cart');
    await main(page).getByRole('link', { name: 'Tiếp tục mua sắm', exact: true }).click();
    await expect(page).toHaveURL('http://localhost:5180/');
    await expect(main(page).getByRole('heading', { name: 'Danh sách sản phẩm', exact: true })).toBeVisible();
  });

  test('add-product-from-home', async ({ page, products }) => {
    // GH-04: assert real product identity, quantity, unit price and line amount.
    await populate(page, [products[0]]);
    const cells = rowFor(page, products[0]).getByRole('cell');
    await expect(cells.nth(0)).toHaveText(products[0].name);
    await expectMoney(cells.nth(1), Number(products[0].price));
    await expectQuantity(rowFor(page, products[0]), 1);
    await expectMoney(cells.nth(3), Number(products[0].price));
  });

  test('cart-column-headings', async ({ page, products }) => {
    // GH-05: exact FR-07 column labels.
    await populate(page, [products[0]]);
    await expect(main(page).getByRole('columnheader')).toHaveText(['Sản phẩm', 'Đơn giá', 'Số lượng', 'Thành tiền', 'Thao tác']);
  });

  test('merge-duplicate-product', async ({ page, products }) => {
    // GH-06: one line with quantity two, not two independent lines.
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
    // GH-07: independent oracle from real catalog prices.
    await populate(page, products);
    for (const product of products) {
      await expectMoney(rowFor(page, product).getByRole('cell').nth(3), Number(product.price));
    }
    await expectMoney(totalAmount(page), products.reduce((sum, p) => sum + Number(p.price), 0));
  });

  test('total-label', async ({ page, products }) => {
    // GH-08: exact label specified by FR-07.
    await populate(page, [products[0]]);
    await expect(main(page).getByText(/^Tổng cộng:/)).toBeVisible();
    await expect(main(page).getByText(/^Tổng tạm tính:/)).toHaveCount(0);
  });

  test('increase-quantity', async ({ page, products }) => {
    // GH-09: FR-07 quantity controls update line amount and grand total.
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
    // GH-10: two increments then one decrement must leave quantity two.
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
    // GH-11: cancellation retains the original row and total.
    await populate(page, [products[0]]);
    await remove(page, products[0], false);
    await expect(rowFor(page, products[0])).toHaveCount(1);
    await expectMoney(totalAmount(page), Number(products[0].price));
  });

  test('confirm-product-removal', async ({ page, products }) => {
    // GH-12: confirmation removes only the chosen row and updates the total.
    await populate(page, products);
    await remove(page, products[0], true);
    await expect(rowFor(page, products[0])).toHaveCount(0);
    await expect(rowFor(page, products[1])).toHaveCount(1);
    await expectMoney(totalAmount(page), Number(products[1].price));
  });

  test('remove-row-recalculates-total', async ({ page, products }) => {
    // GH-13: arithmetic check independent of missing confirmation (GH-11/12).
    await populate(page, products);
    await remove(page, products[0], true, false);
    await expect(rowFor(page, products[0])).toHaveCount(0);
    await expect(rows(page)).toHaveCount(1);
    await expectMoney(totalAmount(page), Number(products[1].price));
  });

  test('remove-last-product-shows-empty-state', async ({ page, products }) => {
    // GH-14: same independent removal setup as GH-13.
    await populate(page, [products[0]]);
    await remove(page, products[0], true, false);
    await expect(emptyMessage(page)).toBeVisible();
    await expect(rows(page)).toHaveCount(0);
  });

  test('continue-shopping-retains-cart', async ({ page, products }) => {
    // GH-15: FR-07 navigation and cart continuity within the SPA.
    await populate(page, [products[0]]);
    await main(page).getByRole('link', { name: /Mua tiếp|Tiếp tục mua sắm/ }).click();
    await expect(page).toHaveURL('http://localhost:5180/');
    await addFromHome(page, products[1]);
    await openCart(page);
    await expect(rows(page)).toHaveCount(2);
    for (const product of products) await expect(rowFor(page, product)).toHaveCount(1);
  });

  test('cart-badge-updates', async ({ page, products }) => {
    // GH-16: use distinct products to avoid ambiguity between item/unit counts.
    await home(page);
    await addFromHome(page, products[0]);
    await expect(cartLink(page)).toContainText(/\b1\b/);
    await addFromHome(page, products[1]);
    await expect(cartLink(page)).toContainText(/\b2\b/);
    await openCart(page);
    await remove(page, products[0], true, false);
    await expect(cartLink(page)).toContainText(/\b1\b/);
  });

  test('product-detail-add-on-first-click', async ({ page, products }) => {
    // GH-17: FR-06 / FR-24 entry point must work on the first click.
    await page.goto(`/product/${products[0].id}`);
    await expect(main(page).getByRole('heading', { name: products[0].name, exact: true })).toBeVisible();
    await main(page).getByRole('spinbutton').fill('3');
    await main(page).getByRole('button', { name: 'Thêm vào giỏ hàng', exact: true }).click();
    await openCart(page);
    await expect(rowFor(page, products[0])).toHaveCount(1);
    await expectQuantity(rowFor(page, products[0]), 3);
    await expectMoney(totalAmount(page), Number(products[0].price) * 3);
  });
  test('quantity-cannot-decrease-below-one', async ({ page, products }) => {
    // GH-18: minimum quantity 1 (FR-06), applied to FR-07 controls.
    await populate(page, [products[0]]);
    const row = rowFor(page, products[0]);
    const decrease = row.getByRole('button', { name: /^(-|−|Giảm|Giảm số lượng)$/i });
    await expect(decrease).toBeVisible();
    if (await decrease.isEnabled()) await decrease.click();
    await expect(row).toHaveCount(1);
    await expectQuantity(row, 1);
    await expectMoney(totalAmount(page), Number(products[0].price));
  });

  for (const [index, label, value] of [
    [19, 'zero', '0'], [20, 'negative', '-1'], [21, 'fractional', '1.5'], [22, 'empty', ''],
  ]) {
    test(`reject-${label}-product-quantity`, async ({ page, products }) => {
      // GH-19–22: FR-06 only allows positive integers. Attempt twice so the
      // known first-click no-op cannot falsely make invalid input look blocked.
      test.info().annotations.push({ type: 'SRS', description: `GH-${index}: FR-06; two explicit submission attempts` });
      await page.goto(`/product/${products[0].id}`);
      await expect(main(page).getByRole('heading', { name: products[0].name, exact: true })).toBeVisible();
      await main(page).getByRole('spinbutton').fill(value);
      const add = main(page).getByRole('button', { name: /^(Thêm vào giỏ hàng|Đã thêm)$/ });
      for (let attempt = 0; attempt < 2; attempt++) {
        if (await add.isEnabled()) await add.click();
      }
      await openCart(page);
      await expect(rows(page), `FR-06: invalid quantity ${JSON.stringify(value)} must not add a row`).toHaveCount(0);
      await expect(emptyMessage(page)).toBeVisible();
    });
  }

  test('home-add-shows-feedback', async ({ page, products }) => {
    // GH-23: feedback is checked before navigating away from the source page.
    await home(page);
    await addFromHome(page, products[0]);
    await expectAddFeedback(page);
  });

  test('product-detail-add-shows-feedback', async ({ page, products }) => {
    // GH-24: the first click must produce the FR-06 toast or badge feedback.
    await page.goto(`/product/${products[0].id}`);
    await expect(main(page).getByRole('heading', { name: products[0].name, exact: true })).toBeVisible();
    await main(page).getByRole('button', { name: 'Thêm vào giỏ hàng', exact: true }).click();
    await expectAddFeedback(page);
  });

  test('cart-breadcrumb-navigation', async ({ page, products }) => {
    // GH-25: FR-23 breadcrumb identifies Cart and links back to Home.
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

  test('merge-different-requested-quantities', async ({ page, products }) => {
    // GH-26: UI setup checkpoints deliberately expose any GH-17 blocker.
    // Never retry a successful add: that could hide double-add regressions.
    await home(page);
    await openProduct(page, products[0]);
    await main(page).getByRole('spinbutton').fill('2');
    await main(page).getByRole('button', { name: 'Thêm vào giỏ hàng', exact: true }).click();
    await openCart(page);
    await expect(rowFor(page, products[0]), 'Setup: first addition must create a row before checking merge').toHaveCount(1);
    await expectQuantity(rowFor(page, products[0]), 2);
    await main(page).getByRole('link', { name: /Mua tiếp|Tiếp tục mua sắm/ }).click();
    await openProduct(page, products[0]);
    await main(page).getByRole('spinbutton').fill('3');
    await main(page).getByRole('button', { name: 'Thêm vào giỏ hàng', exact: true }).click();
    await openCart(page);
    await expect(rows(page)).toHaveCount(1);
    await expectQuantity(rowFor(page, products[0]), 5);
    await expectMoney(rowFor(page, products[0]).getByRole('cell').nth(3), Number(products[0].price) * 5);
    await expectMoney(totalAmount(page), Number(products[0].price) * 5);
  });

  test('remove-middle-product-keeps-other-rows', async ({ page, catalog }) => {
    // GH-27: independently verify row identity/index handling and arithmetic.
    await populate(page, catalog);
    await remove(page, catalog[1], true, false);
    await expect(rows(page)).toHaveCount(2);
    await expect(rowFor(page, catalog[1])).toHaveCount(0);
    for (const product of [catalog[0], catalog[2]]) {
      await expect(rowFor(page, product)).toHaveCount(1);
      await expectQuantity(rowFor(page, product), 1);
      await expectMoney(rowFor(page, product).getByRole('cell').nth(3), Number(product.price));
    }
    await expectMoney(totalAmount(page), Number(catalog[0].price) + Number(catalog[2].price));
  });
});
