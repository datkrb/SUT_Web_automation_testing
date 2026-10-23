// Plan: README.md#thanh-toán — seed: fresh context, UUID account, one product.
import { test, expect, API } from '../helpers/fixtures.mjs';
import { productPrice } from '../helpers/cart.mjs';
import { openCheckout } from '../helpers/checkout.mjs';

test.describe('Thanh toán', () => {
  test('successful-checkout-clears-cart', async ({ page, account, request }) => {
    // 1. Mở Checkout và thanh toán qua UI với tổng tiền đúng.
    const price = await productPrice(request);
    await openCheckout(page, account);
    const pending = page.waitForResponse(response => response.url().endsWith('/api/checkout') && response.request().method() === 'POST');
    await page.getByRole('button', { name: 'Xác Nhận Thanh Toán', exact: true }).click();
    const response = await pending;
    expect(response.ok()).toBeTruthy();
    const { orderId } = await response.json();
    await expect(page.getByRole('heading', { name: 'Thanh toán thành công!', exact: true })).toBeVisible();
    // 2. Đọc lại đơn của đúng user để kiểm tra đã lưu tổng đúng.
    const token = await page.evaluate(() => localStorage.getItem('token'));
    const ordersResponse = await request.get(`${API}/orders/my-orders`, { headers: { Authorization: `Bearer ${token}` } });
    expect(ordersResponse.ok()).toBeTruthy();
    const order = (await ordersResponse.json()).find(item => item.id === orderId);
    expect(order).toBeTruthy();
    expect(Number(order.total_amount)).toBe(price);
    // 3. FR-08: quay lại giỏ trong cùng SPA; không reload vì có thể che lỗi chưa clear cart.
    await page.getByRole('link', { name: 'Giỏ hàng', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Giỏ hàng của bạn đang trống', exact: true })).toBeVisible();
    await expect(page.getByRole('row')).toHaveCount(0);
  });
});
