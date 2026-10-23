// Plan: README.md#đăng-nhập — seed: fresh context, /login. Requirement: FR-22.
import { test, expect } from '../helpers/fixtures.mjs';

test.describe('Đăng nhập', () => {
  test('password-masking', async ({ page }) => {
    // 1. Mở Login: trường mật khẩu phải che ký tự.
    await page.goto('/login');
    await expect(page.locator('form input').nth(1)).toHaveAttribute('type', 'password');
  });
});
