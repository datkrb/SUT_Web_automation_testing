// Plan: README.md#giỏ-hàng — seed: fresh context, empty cart.
import { test, expect } from '../helpers/fixtures.mjs';
import { addProduct, productRows, productPrice, money } from '../helpers/cart.mjs';

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
});
