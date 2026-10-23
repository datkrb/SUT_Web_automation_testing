// Plan: README.md#thanh-toán — seed: fresh guest context, empty cart.
import { test, expect } from '../helpers/fixtures.mjs';
import { addProduct } from '../helpers/cart.mjs';

test.describe('Thanh toán', () => {
  test('guest-checkout-ui-rejected', async ({ page }) => {
    // 1. Chưa đăng nhập, thêm một sản phẩm và bấm thanh toán.
    await addProduct(page);
    page.on('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'Tiến hành thanh toán', exact: true }).click();
    // 2. FR-08: yêu cầu đăng nhập trước khi thanh toán.
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole('button', { name: 'Sign In', exact: true })).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem('token'))).toBeNull();
  });
});
