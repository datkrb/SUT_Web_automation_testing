// Plan: README.md#đăng-nhập — seed: fresh context, /login.
import { test, expect } from '../helpers/fixtures.mjs';

test.describe('Đăng nhập', () => {
  test('email-format-validation', async ({ page }) => {
    // 1. Mở form đăng nhập và kiểm tra kiểu email theo FR-02.
    await page.goto('/login');
    const email = page.locator('form input').nth(0);
    await expect(email).toHaveAttribute('type', 'email');
    // 2. Nhập email sai định dạng: HTML5 phải đánh dấu typeMismatch.
    await email.fill('invalid-email');
    expect(await email.evaluate(element => element.validity.typeMismatch)).toBe(true);
  });
});
