import { test, expect } from '../fixtures/test.js';

test.describe('Admin login', () => {
  test('admin login page shows form and valid credentials log the user in', {
    tag: ['@regression', '@smoke'],
  }, async ({
    adminPage,
    page,
    env,
  }) => {
    await adminPage.goto('/admin');

    await expect(page).toHaveURL(/\/admin/);
    await expect(adminPage.loginHeading).toBeVisible();
    await expect(adminPage.usernameInput).toBeVisible();
    await expect(adminPage.passwordInput).toBeVisible();
    await expect(adminPage.loginButton).toBeVisible();

    await adminPage.usernameInput.fill(env.admin.username);
    await adminPage.passwordInput.fill(env.admin.password);
    await adminPage.loginButton.click();

    await expect(adminPage.logoutButton).toBeVisible({ timeout: 10000 });
  });

  // Scenarios 12a–12c: mandatory-field validation. Expected: "Invalid credentials" message appears.
  test('Scenario 12a: Login with no credentials keeps user on login page', {
    tag: '@regression',
  }, async ({
    adminPage,
    page,
  }) => {
    await page.context().clearCookies();
    await adminPage.goto('/admin');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.reload();
    await expect(adminPage.loginButton).toBeVisible();

    await adminPage.loginButton.click();

    await expect(page).toHaveURL(/\/admin/);
    await expect(adminPage.loginHeading).toBeVisible();
    await expect(adminPage.loginErrorMessage).toBeVisible();
  });

  test('Scenario 12b: Login with only Username (Password empty) does not log in', async ({
    adminPage,
    page,
    env,
  }) => {
    await page.context().clearCookies();
    await adminPage.goto('/admin');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.reload();
    await adminPage.usernameInput.fill(env.admin.username);

    await adminPage.loginButton.click();

    await expect(page).toHaveURL(/\/admin/);
    await expect(adminPage.loginHeading).toBeVisible();
    await expect(adminPage.loginErrorMessage).toBeVisible();
  });

  test('Scenario 12c: Login with only Password (Username empty) does not log in', async ({
    adminPage,
    page,
    env,
  }) => {
    await page.context().clearCookies();
    await adminPage.goto('/admin');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.reload();
    await adminPage.passwordInput.fill(env.admin.password);

    await adminPage.loginButton.click();

    await expect(page).toHaveURL(/\/admin/);
    await expect(adminPage.loginHeading).toBeVisible();
    await expect(adminPage.loginErrorMessage).toBeVisible();
  });
});
