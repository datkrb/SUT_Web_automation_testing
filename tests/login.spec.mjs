// Generated with Codex + Microsoft playwright-cli after live login exploration.
// Plan: README.md section 4. Oracle: EShop SRS FR-02 and applicable FR-22.
import { test as base, expect } from 'playwright/test';
import { randomUUID } from 'node:crypto';

const API = 'http://localhost:3000/api';
const ERROR = 'Đăng nhập thất bại. Vui lòng kiểm tra lại.';
const WRONG_PASSWORD = 'WrongPassword123!';
const test = base.extend({
  account: async ({ request }, use) => {
    const account = { name: 'Login fixture', email: `login-${randomUUID()}@example.test`, password: 'Playwright123!' };
    const response = await request.post(`${API}/register`, { data: account });
    expect(response.ok(), 'Fixture registration must succeed').toBeTruthy();
    await use(account);
  },
});

// CLI found unassociated labels and two unnamed textboxes. Keep a form-scoped
// fallback that also works after the password field is corrected to type=password.
const emailInput = page => page.locator('form input').nth(0);
const passwordInput = page => page.locator('form input').nth(1);
const submitButton = page => page.getByRole('button', { name: 'Sign In', exact: true });

async function login(page, account) {
  await page.goto('/login');
  await emailInput(page).fill(account.email);
  await passwordInput(page).fill(account.password);
  const response = page.waitForResponse(r => r.url().endsWith('/api/login') && r.request().method() === 'POST');
  await submitButton(page).click();
  return response;
}

async function expectSignedIn(page, account) {
  await expect(page).toHaveURL('http://localhost:5180/');
  await expect(page.getByRole('link', { name: `Chào, ${account.name}`, exact: true })).toBeVisible();
}

async function expectRejected(page, response) {
  expect(response.status()).toBeGreaterThanOrEqual(400);
  expect(response.status()).toBeLessThan(500);
  await expect(page.getByText(ERROR, { exact: true })).toBeVisible();
  await expect(page).toHaveURL(/\/login$/);
  expect(await page.evaluate(() => localStorage.getItem('token'))).toBeNull();
}

test.describe('Đăng nhập', () => {
  test('valid-login', async ({ page, account }) => {
    // LG-01: valid UI login stores JWT and sends it on a real protected request.
    const protectedRequest = page.waitForRequest(r => r.url().endsWith('/api/users/me') && r.method() === 'GET');
    expect((await login(page, account)).ok()).toBeTruthy();
    await expectSignedIn(page, account);
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toMatch(/^[^.]+\.[^.]+\.[^.]+$/);
    expect((await protectedRequest).headers().authorization).toBe(`Bearer ${token}`);
  });

  test('reject-wrong-password', async ({ page, account }) => {
    // LG-02: reject without leaking details or creating an authenticated state.
    await expectRejected(page, await login(page, { ...account, password: WRONG_PASSWORD }));
  });

  test('reject-unknown-email', async ({ page, account }) => {
    // LG-03: unknown email gets the same public message as a wrong password.
    await expectRejected(page, await login(page, { ...account, email: `unknown-${account.email}` }));
  });

  test('empty-email-blocked', async ({ page }) => {
    // LG-04: HTML required validation blocks an empty email before any API call.
    await page.goto('/login');
    await passwordInput(page).fill('Playwright123!');
    await expect(emailInput(page)).toHaveAttribute('required', '');
    expect(await emailInput(page).evaluate(input => input.validity.valueMissing)).toBe(true);
    let submitted = false;
    page.on('request', request => { if (request.url().endsWith('/api/login') && request.method() === 'POST') submitted = true; });
    await submitButton(page).click();
    await expect(emailInput(page)).toBeFocused();
    await expect(page).toHaveURL(/\/login$/);
    expect(submitted).toBe(false);
  });

  test('empty-password-blocked', async ({ page }) => {
    // LG-05: HTML required validation blocks an empty password.
    await page.goto('/login');
    await emailInput(page).fill('login-required@example.test');
    await expect(passwordInput(page)).toHaveAttribute('required', '');
    expect(await passwordInput(page).evaluate(input => input.validity.valueMissing)).toBe(true);
    let submitted = false;
    page.on('request', request => { if (request.url().endsWith('/api/login') && request.method() === 'POST') submitted = true; });
    await submitButton(page).click();
    await expect(passwordInput(page)).toBeFocused();
    await expect(page).toHaveURL(/\/login$/);
    expect(submitted).toBe(false);
  });

  test('email-input-type', async ({ page }) => {
    // LG-06: FR-02 / FR-22 explicitly require type=email.
    await page.goto('/login');
    await expect(emailInput(page)).toHaveAttribute('type', 'email');
  });

  test('malformed-email-validation', async ({ page }) => {
    // LG-07: inspect HTML5 validation independently of the input-type checkpoint.
    await page.goto('/login');
    await emailInput(page).fill('invalid-email');
    expect(await emailInput(page).evaluate(input => input.validity.typeMismatch), 'FR-02 requires HTML5 email-format validation').toBe(true);
  });

  test('password-masking', async ({ page }) => {
    // LG-08: FR-22 requires masked password characters.
    await page.goto('/login');
    await expect(passwordInput(page)).toHaveAttribute('type', 'password');
  });

  test('not-locked-after-two-failures', async ({ page, account }) => {
    // LG-09: two wrong attempts are below the FR-02 lock threshold.
    for (let attempt = 0; attempt < 2; attempt++) {
      await expectRejected(page, await login(page, { ...account, password: WRONG_PASSWORD }));
    }
    expect((await login(page, account)).ok(), 'FR-02: two failures must not lock the account').toBeTruthy();
    await expectSignedIn(page, account);
  });

  test('locked-after-three-failures', async ({ page, account }) => {
    // LG-10: valid credentials must be rejected while the account is locked.
    for (let attempt = 0; attempt < 3; attempt++) {
      await expectRejected(page, await login(page, { ...account, password: WRONG_PASSWORD }));
    }
    await expectRejected(page, await login(page, account));
  });

  test('lock-expires-after-thirty-seconds', async ({ page, account }) => {
    // LG-11: use actual server time; browser clock cannot expire a backend lock.
    for (let attempt = 0; attempt < 3; attempt++) {
      await expectRejected(page, await login(page, { ...account, password: WRONG_PASSWORD }));
    }
    await new Promise(resolve => setTimeout(resolve, 31000));
    expect((await login(page, account)).ok(), 'FR-02: lock must expire after 30 seconds').toBeTruthy();
    await expectSignedIn(page, account);
  });

  test('success-breaks-failure-streak', async ({ page, account }) => {
    // LG-12: three failures separated by successful logins are not consecutive.
    for (let cycle = 0; cycle < 3; cycle++) {
      await expectRejected(page, await login(page, { ...account, password: WRONG_PASSWORD }));
      expect((await login(page, account)).ok()).toBeTruthy();
      await expectSignedIn(page, account);
      await page.getByRole('button', { name: 'Thoát', exact: true }).click();
      await expect(page.getByRole('link', { name: 'Đăng nhập', exact: true })).toBeVisible();
      expect(await page.evaluate(() => localStorage.getItem('token'))).toBeNull();
    }
  });

  test('required-fields-have-markers', async ({ page }) => {
    // LG-13: FR-22 requires a visible asterisk beside required field labels.
    await page.goto('/login');
    const labels = await page.locator('form label').allTextContents();
    expect(labels).toHaveLength(2);
    expect(labels.filter(label => !label.includes('*')), 'FR-22: required labels missing *').toEqual([]);
  });

  test('error-above-submit', async ({ page, account }) => {
    // LG-14: compare rendered positions; the message must be above Submit.
    await expectRejected(page, await login(page, { ...account, password: WRONG_PASSWORD }));
    const errorBox = await page.getByText(ERROR, { exact: true }).boundingBox();
    const buttonBox = await submitButton(page).boundingBox();
    expect(errorBox).toBeTruthy();
    expect(buttonBox).toBeTruthy();
    expect(errorBox.y + errorBox.height, 'FR-22: error must appear above the submit button').toBeLessThanOrEqual(buttonBox.y);
  });
});
