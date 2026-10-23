// Plan: README.md#thanh-toán — seed: fresh API context, no Authorization header.
import { test, expect, API } from '../helpers/fixtures.mjs';

test.describe('Thanh toán', () => {
  test('guest-checkout-api-rejected', async ({ request }) => {
    // 1. Gửi checkout không token; backend phải bảo vệ endpoint.
    const response = await request.post(`${API}/checkout`, {
      data: { items: [{ id: 1, quantity: 1 }], total_amount: 30000000 },
    });
    // 2. Hợp đồng API hiện tại trả 401 khi chưa xác thực.
    expect(response.status()).toBe(401);
  });
});
