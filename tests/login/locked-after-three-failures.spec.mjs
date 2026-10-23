// Plan: README.md#đăng-nhập — seed: fresh context, /login, UUID account.
import { test, expect, submitLogin } from '../helpers/fixtures.mjs';

test.describe('Đăng nhập', () => {
  test('locked-after-three-failures', async ({ page, account }) => {
    // 1. Nhập sai ba lần liên tiếp.
    for (let attempt = 0; attempt < 3; attempt++) {
      const response = await submitLogin(page, { ...account, password: 'WrongPassword123!' });
      expect(response.status()).toBeGreaterThanOrEqual(400);
      expect(response.status()).toBeLessThan(500);
    }
    // 2. Nhập đúng ngay: tài khoản vẫn bị khóa.
    const response = await submitLogin(page, account);
    expect(response.status()).toBeGreaterThanOrEqual(400);
    expect(response.status()).toBeLessThan(500);
    await expect(page).toHaveURL(/\/login$/);
    expect(await page.evaluate(() => localStorage.getItem('token'))).toBeNull();
  });
});
