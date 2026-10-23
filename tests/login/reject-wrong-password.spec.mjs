// Plan: README.md#đăng-nhập — seed: fresh context, /login, UUID account.
import { test, expect, submitLogin } from '../helpers/fixtures.mjs';

test.describe('Đăng nhập', () => {
  test('reject-wrong-password', async ({ page, account }) => {
    // 1. Nhập email đã đăng ký và mật khẩu sai.
    const response = await submitLogin(page, { ...account, password: 'WrongPassword123!' });
    // 2. Kiểm tra bị từ chối, lỗi chung, không token, vẫn ở Login.
    expect(response.status()).toBeGreaterThanOrEqual(400);
    expect(response.status()).toBeLessThan(500);
    await expect(page.getByText('Đăng nhập thất bại. Vui lòng kiểm tra lại.', { exact: true })).toBeVisible();
    await expect(page).toHaveURL(/\/login$/);
    expect(await page.evaluate(() => localStorage.getItem('token'))).toBeNull();
  });
});
