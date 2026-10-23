// Plan: README.md#giỏ-hàng — seed: fresh context, empty cart.
import { test, expect } from '../helpers/fixtures.mjs';
import { addProduct, productCard, productRows } from '../helpers/cart.mjs';

test.describe('Giỏ hàng', () => {
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
