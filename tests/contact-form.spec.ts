import { test, expect } from '../fixtures/test.js';

test.describe('Contact form', () => {
  test('contact form has all fields and submit shows success feedback', {
    tag: '@regression',
  }, async ({
    homePage,
    page,
    env,
  }) => {
    await homePage.goto('/');

    await expect(homePage.contactSectionHeading).toBeVisible();
    await expect(homePage.contactNameInput).toBeVisible();
    await expect(homePage.contactEmailInput).toBeVisible();
    await expect(homePage.contactPhoneInput).toBeVisible();
    await expect(homePage.contactSubjectInput).toBeVisible();
    await expect(homePage.contactMessageInput).toBeVisible();
    await expect(homePage.contactSubmitButton).toBeVisible();

    await homePage.contactNameInput.fill(env.contact.name);
    await homePage.contactEmailInput.fill(env.contact.email);
    await homePage.contactPhoneInput.fill(env.contact.phone);
    await homePage.contactSubjectInput.fill(env.contact.subject);
    await homePage.contactMessageInput.fill(env.contact.message);
    await homePage.contactSubmitButton.click();

    await expect(homePage.contactSuccessMessage).toBeVisible({ timeout: 10000 });
  });
});
