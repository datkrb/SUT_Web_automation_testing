// Plan: README.md#giỏ-hàng — seed: fresh context, empty cart.
import { test, expect } from '../helpers/fixtures.mjs';
import { addProduct, productPrice, money } from '../helpers/cart.mjs';

test.describe('Giỏ hàng', () => {
  test('correct-total-label', async ({ page, request }) => {
    // 1. Thêm một sản phẩm rồi đọc tổng tiền.
    const price = await productPrice(request);
    await addProduct(page);
    // 2. FR-07 yêu cầu nhãn Tổng cộng và giá trị tương ứng.
    await expect(page.getByText(`Tổng cộng: ${money(price)}`, { exact: true })).toBeVisible();
  });
});
