// Plan: README.md#đăng-nhập — seed: fresh context, /login, UUID account.
import { test, expect, submitLogin } from '../helpers/fixtures.mjs';

test.describe('Đăng nhập', () => {
  test('lock-expires-after-thirty-seconds', async ({ page, account }) => {
    // 1. Nhập sai ba lần để kích hoạt khóa tài khoản.
    for (let attempt = 0; attempt < 3; attempt++) {
      const response = await submitLogin(page, { ...account, password: 'WrongPassword123!' });
      expect(response.status()).toBeGreaterThanOrEqual(400);
      expect(response.status()).toBeLessThan(500);
    }
    // 2. FR-02 quy định 30 giây thực; đây không phải đợi UI hay giả lập clock trình duyệt.
    await new Promise(resolve => setTimeout(resolve, 31000));
    // 3. Nhập đúng sau khi hết khóa: phải đăng nhập được.
    expect((await submitLogin(page, account)).ok(), 'FR-02: lock must expire after 30 seconds').toBeTruthy();
    await expect(page).toHaveURL('http://localhost:5180/');
  });
});
