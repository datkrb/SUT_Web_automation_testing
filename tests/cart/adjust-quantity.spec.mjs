// Plan: README.md#giỏ-hàng — seed: fresh context, empty cart.
import { test, expect } from '../helpers/fixtures.mjs';
import { addProduct, productRows, productPrice, money } from '../helpers/cart.mjs';

test.describe('Giỏ hàng', () => {
  test('adjust-quantity', async ({ page, request }) => {
    // 1. Thêm một sản phẩm và kiểm tra có controls +/- theo FR-07.
    const price = await productPrice(request);
    await addProduct(page);
    const row = productRows(page);
    const increase = row.getByRole('button', { name: '+', exact: true });
    const decrease = row.getByRole('button', { name: '-', exact: true });
    await expect(increase, 'FR-07 requires quantity increase control').toBeVisible();
    await expect(decrease, 'FR-07 requires quantity decrease control').toBeVisible();
    // 2. Tăng lên 2 rồi giảm về 1, kiểm tra thành tiền cả hai lần.
    await increase.click();
    await expect(row.getByRole('cell').nth(2)).toHaveText('2');
    await expect(row.getByRole('cell').nth(3)).toHaveText(money(price * 2));
    await decrease.click();
    await expect(row.getByRole('cell').nth(2)).toHaveText('1');
    await expect(row.getByRole('cell').nth(3)).toHaveText(money(price));
  });
});
