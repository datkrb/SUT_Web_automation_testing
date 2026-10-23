// Plan: README.md#đăng-nhập — seed: fresh context, /login, UUID account.
import { test, expect, submitLogin } from '../helpers/fixtures.mjs';

test.describe('Đăng nhập', () => {
  test('not-locked-after-two-failures', async ({ page, account }) => {
    // 1. Đăng nhập sai đúng hai lần; chưa đủ ngưỡng khóa FR-02.
    for (let attempt = 0; attempt < 2; attempt++) {
      const response = await submitLogin(page, { ...account, password: 'WrongPassword123!' });
      expect(response.status()).toBeGreaterThanOrEqual(400);
      expect(response.status()).toBeLessThan(500);
    }
    // 2. Nhập đúng: phải đăng nhập được.
    expect((await submitLogin(page, account)).ok(), 'FR-02: two failures must not lock the account').toBeTruthy();
    await expect(page).toHaveURL('http://localhost:5180/');
  });
});
