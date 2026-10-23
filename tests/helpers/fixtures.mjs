import { test as base, expect } from 'playwright/test';
import { randomUUID } from 'node:crypto';

export const API = 'http://localhost:3000/api';
export const PRODUCT = 'iPhone 15 Pro Max';
export const test = base.extend({
  account: async ({ request }, use) => {
    const account = { name: 'Playwright fixture', email: `pw-${randomUUID()}@example.test`, password: 'Playwright123!' };
    const response = await request.post(`${API}/register`, { data: account });
    expect(response.ok(), 'Test-account setup must succeed').toBeTruthy();
    await use(account);
  },
});
export { expect };

export async function submitLogin(page, account) {
  await page.goto('/login');
  // The supplied SUT has labels without for/id associations; scope the fallback to this form.
  await page.locator('form input').nth(0).fill(account.email);
  await page.locator('form input').nth(1).fill(account.password);
  const response = page.waitForResponse(r => r.url().endsWith('/api/login') && r.request().method() === 'POST');
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();
  return response;
}

export async function signIn(page, account) {
  expect((await submitLogin(page, account)).ok()).toBeTruthy();
  await expect(page).toHaveURL('http://localhost:5180/');
  await expect(page.getByRole('link', { name: `Chào, ${account.name}`, exact: true })).toBeVisible();
}
