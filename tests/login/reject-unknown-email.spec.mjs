// Plan: README.md#đăng-nhập — seed: fresh context, /login, UUID account.
import { test, expect, submitLogin } from '../helpers/fixtures.mjs';

test.describe('Đăng nhập', () => {
  test('reject-unknown-email', async ({ page, account }) => {
    // 1. Nhập email chưa đăng ký.
    const response = await submitLogin(page, { ...account, email: `unknown-${account.email}` });
    // 2. Kiểm tra lỗi chung không tiết lộ tài khoản và không cấp token.
    expect(response.status()).toBeGreaterThanOrEqual(400);
    expect(response.status()).toBeLessThan(500);
    await expect(page.getByText('Đăng nhập thất bại. Vui lòng kiểm tra lại.', { exact: true })).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem('token'))).toBeNull();
  });
});
