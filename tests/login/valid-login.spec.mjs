// Plan: README.md#đăng-nhập — seed: fresh context, /login, UUID account.
import { test, expect, signIn } from '../helpers/fixtures.mjs';

test.describe('Đăng nhập', () => {
  test('valid-login', async ({ page, account }) => {
    // 1. Nhập đúng email/mật khẩu và gửi form.
    await signIn(page, account);
    // 2. Kiểm tra token được cấp, cùng với URL và greeting đã kiểm tra trong signIn.
    await expect.poll(() => page.evaluate(() => localStorage.getItem('token'))).toMatch(/^[^.]+\.[^.]+\.[^.]+$/);
  });
});
