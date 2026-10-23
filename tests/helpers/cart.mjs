import { expect, PRODUCT, API } from './fixtures.mjs';

export function productCard(page) {
  return page.locator('main div.border').filter({
    has: page.getByRole('heading', { name: PRODUCT, exact: true }),
  });
}

export function productRows(page) {
  return page.getByRole('row').filter({ has: page.getByRole('cell', { name: PRODUCT, exact: true }) });
}

export function money(value) {
  return `${Number(value).toLocaleString('vi-VN')} ₫`;
}

export async function productPrice(request) {
  const response = await request.get(`${API}/products`);
  expect(response.ok(), 'Product fixture must be available').toBeTruthy();
  const products = await response.json();
  const product = products.find(item => item.id === 1 && item.name === PRODUCT);
  expect(product, 'Expected seeded product ID 1').toBeTruthy();
  return Number(product.price);
}

export async function addProduct(page) {
  await page.goto('/');
  await productCard(page).getByRole('button', { name: 'Thêm vào giỏ', exact: true }).click();
  // SPA navigation preserves the in-memory cart; a full page.goto('/cart') would reset it.
  await page.getByRole('link', { name: 'Giỏ hàng', exact: true }).click();
  await expect(productRows(page)).toHaveCount(1);
}
