// Plan: README.md#thanh-toán — seed: fresh context, UUID account, one product.
import { test, expect, PRODUCT } from '../helpers/fixtures.mjs';
import { productPrice, money } from '../helpers/cart.mjs';
import { openCheckout } from '../helpers/checkout.mjs';

test.describe('Thanh toán', () => {
  test('order-summary', async ({ page, account, request }) => {
    // 1. Đăng nhập, thêm một sản phẩm và mở Checkout.
    const price = await productPrice(request);
    await openCheckout(page, account);
    // 2. Kiểm tra tên, số lượng, thành tiền đúng với giỏ.
    await expect(page.getByRole('listitem')).toHaveCount(1);
    await expect(page.getByRole('listitem')).toHaveText(`${PRODUCT} x 1 — ${money(price)}`);
    await expect(page.getByText(`Tổng thanh toán: ${money(price)}`, { exact: true })).toBeVisible();
  });
});
