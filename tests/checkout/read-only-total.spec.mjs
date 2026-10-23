// Plan: README.md#thanh-toán — seed: fresh context, UUID account, one product.
import { test, expect } from '../helpers/fixtures.mjs';
import { productPrice } from '../helpers/cart.mjs';
import { openCheckout } from '../helpers/checkout.mjs';

test.describe('Thanh toán', () => {
  test('read-only-total', async ({ page, account, request }) => {
    // 1. Đăng nhập, có một sản phẩm và mở Checkout.
    const price = await productPrice(request);
    await openCheckout(page, account);
    // 2. FR-08: tổng tự tính và không chỉnh trực tiếp được.
    const total = page.getByRole('spinbutton');
    await expect(total).toHaveValue(String(price));
    await expect(total, 'FR-08: checkout total must not be editable').not.toBeEditable();
  });
});
