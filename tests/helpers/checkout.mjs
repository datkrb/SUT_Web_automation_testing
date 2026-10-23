import { expect, signIn } from './fixtures.mjs';
import { addProduct } from './cart.mjs';

export async function openCheckout(page, account) {
  await signIn(page, account);
  await addProduct(page);
  await page.getByRole('button', { name: 'Tiến hành thanh toán', exact: true }).click();
  await expect(page).toHaveURL(/\/checkout$/);
  await expect(page.getByRole('heading', { name: 'Xác Nhận Đơn Hàng', exact: true })).toBeVisible();
}
