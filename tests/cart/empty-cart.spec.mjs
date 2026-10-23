// Plan: README.md#giỏ-hàng — seed: fresh context, empty cart.
import { test, expect } from '../helpers/fixtures.mjs';

test.describe('Giỏ hàng', () => {
  test('empty-cart', async ({ page }) => {
    // 1. Mở giỏ hàng trong context mới.
    await page.goto('/cart');
    // 2. Kiểm tra empty state và đường quay lại mua sắm.
    await expect(page.getByRole('heading', { name: 'Giỏ hàng của bạn đang trống', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Tiếp tục mua sắm', exact: true })).toHaveAttribute('href', '/');
  });
});
