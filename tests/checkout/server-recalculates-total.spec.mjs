// Plan: README.md#thanh-toán — seed: fresh context, UUID account.
import { test, expect, API, signIn } from '../helpers/fixtures.mjs';
import { productPrice } from '../helpers/cart.mjs';

test.describe('Thanh toán', () => {
  test('server-recalculates-total', async ({ page, account, request }) => {
    // 1. Đăng nhập thật qua UI và lấy giá chuẩn từ backend.
    const price = await productPrice(request);
    await signIn(page, account);
    const token = await page.evaluate(() => localStorage.getItem('token'));
    const headers = { Authorization: `Bearer ${token}` };
    // 2. Cố gửi tổng và giá giả. FR-08: backend không được tin giá client.
    const response = await request.post(`${API}/checkout`, {
      headers,
      data: { items: [{ id: 1, quantity: 1, price: 1 }], total_amount: 1 },
    });
    // 3. Có thể từ chối request 4xx; nếu chấp nhận, đơn phải lưu tổng tự tính từ giá server.
    if (response.status() >= 400 && response.status() < 500) return;
    expect(response.ok()).toBeTruthy();
    const { orderId } = await response.json();
    const ordersResponse = await request.get(`${API}/orders/my-orders`, { headers });
    expect(ordersResponse.ok()).toBeTruthy();
    const order = (await ordersResponse.json()).find(item => item.id === orderId);
    expect(order).toBeTruthy();
    expect(Number(order.total_amount), 'FR-08: server must recalculate the product price').toBe(price);
  });
});
