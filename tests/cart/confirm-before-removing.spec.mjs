// Plan: README.md#giỏ-hàng — seed: fresh context, empty cart.
import { test, expect } from '../helpers/fixtures.mjs';
import { addProduct, productRows } from '../helpers/cart.mjs';

test.describe('Giỏ hàng', () => {
  test('confirm-before-removing', async ({ page }) => {
    // 1. Thêm sản phẩm; bắt native confirm nếu có, hủy lần đầu và chấp nhận lần sau.
    await addProduct(page);
    let confirmations = 0;
    let accept = false;
    page.on('dialog', async dialog => {
      if (dialog.type() === 'confirm') confirmations++;
      if (accept) await dialog.accept();
      else await dialog.dismiss();
    });
    await page.getByRole('button', { name: 'Xóa', exact: true }).click();
    // 2. Chấp nhận native confirm hoặc accessible custom dialog, không chấp nhận xóa ngay.
    const dialog = page.getByRole('dialog');
    await expect.poll(async () => confirmations + await dialog.count(), { message: 'FR-07 requires deletion confirmation' }).toBeGreaterThan(0);
    if (await dialog.count()) await dialog.getByRole('button', { name: /^(Hủy|Cancel)$/i }).click();
    await expect(productRows(page)).toHaveCount(1);
    // 3. Xóa lần nữa và xác nhận: giỏ phải trống.
    accept = true;
    await page.getByRole('button', { name: 'Xóa', exact: true }).click();
    if (await dialog.count()) await dialog.getByRole('button', { name: /^(Xóa|Xác nhận|Delete|Confirm)$/i }).click();
    await expect(page.getByRole('heading', { name: 'Giỏ hàng của bạn đang trống', exact: true })).toBeVisible();
  });
});
