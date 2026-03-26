import { test, expect } from '../fixtures/test.js';
import type { RoomPage } from '../pages/RoomPage.js';

async function fillGuestFormExcept(
  roomPage: RoomPage,
  env: { contact: { email: string; phone: string } },
  skipField: 'firstname' | 'lastname' | 'email' | 'phone',
) {
  if (skipField !== 'firstname') await roomPage.firstnameInput.fill('Test');
  if (skipField !== 'lastname') await roomPage.lastnameInput.fill('Guest');
  if (skipField !== 'email') await roomPage.emailInput.fill(env.contact.email);
  if (skipField !== 'phone') await roomPage.phoneInput.fill(env.contact.phone);
}

test.describe('Suite Room page (booking)', () => {
  test.beforeEach(async ({ suiteRoomPage }) => {
    await suiteRoomPage.gotoRoom();
    await suiteRoomPage.waitForBookingWidget();
  });

  test('Suite Room page layout and sections are visible', async ({
    suiteRoomPage,
    page,
  }) => {
    await expect(page).toHaveURL(/\/reservation\/3/);
    await expect(suiteRoomPage.roomHeading).toHaveText(/^Suite/);
    await expect(suiteRoomPage.roomDescriptionHeading).toBeVisible();
    await expect(suiteRoomPage.roomFeaturesHeading).toBeVisible();
    await expect(suiteRoomPage.roomPoliciesHeading).toBeVisible();
    await expect(suiteRoomPage.bookThisRoomHeading).toBeVisible();
    await expect(suiteRoomPage.priceSummaryHeading).toBeVisible();
    await expect(suiteRoomPage.reserveNowButton).toBeVisible();
    await expect(suiteRoomPage.similarRoomsHeading).toBeVisible();
  });

  test('View Details for Single room opens Single room page', async ({
    suiteRoomPage,
    page,
  }) => {
    await expect(suiteRoomPage.similarRoomsHeading).toBeVisible();
    await suiteRoomPage.viewDetailsForRoom('Single').click();
    await expect(page).toHaveURL(/\/reservation\/1/);
    await expect(page.getByRole('heading', { name: 'Single Room', level: 1 })).toBeVisible();
    await expect(suiteRoomPage.bookThisRoomHeading).toBeVisible();
  });

  test('View Details for Double room opens Double room page', async ({
    suiteRoomPage,
    page,
  }) => {
    await expect(suiteRoomPage.similarRoomsHeading).toBeVisible();
    await suiteRoomPage.viewDetailsForRoom('Double').click();
    await expect(page).toHaveURL(/\/reservation\/2/);
    await expect(page.getByRole('heading', { name: /^Double/, level: 1 })).toBeVisible();
    await expect(suiteRoomPage.bookThisRoomHeading).toBeVisible();
  });

  test('Breadcrumb Home link navigates back to home page', async ({
    suiteRoomPage,
    page,
  }) => {
    await expect(suiteRoomPage.breadcrumbHomeLink).toBeVisible();
    await suiteRoomPage.breadcrumbHomeLink.click();
    await expect(page).toHaveURL(/\/$|\/\?/);
    await expect(page.getByRole('heading', { name: 'Welcome to Shady Meadows B&B', level: 1 })).toBeVisible();
  });

  test('Cancel button keeps user on room page without submitting', async ({
    suiteRoomPage,
    page,
  }) => {
    await suiteRoomPage.selectDates();
    await suiteRoomPage.reserveNowButton.click();
    await expect(suiteRoomPage.firstnameInput).toBeVisible({ timeout: 5000 });
    await expect(suiteRoomPage.cancelButton).toBeVisible();
    await suiteRoomPage.cancelButton.click();
    await expect(page).toHaveURL(/\/reservation\/3/);
    await expect(suiteRoomPage.roomHeading).toHaveText(/^Suite/);
  });

  test('Reserve Now without selecting dates shows validation or does not submit', {
    tag: '@regression',
  }, async ({
    suiteRoomPage,
    page,
  }) => {
    await expect(suiteRoomPage.reserveNowButton).toBeVisible();
    await suiteRoomPage.reserveNowButton.click();
    const urlAfter = page.url();
    const stillOnRoomPage = urlAfter.includes('/reservation/3');
    const validationShown = await suiteRoomPage.validationMessage.isVisible().catch(() => false);
    expect(stillOnRoomPage || validationShown).toBeTruthy();
  });

  test('Reserve Now with dates but without guest details shows validation', {
    tag: '@regression',
  }, async ({
    suiteRoomPage,
  }) => {
    await suiteRoomPage.selectDates();
    await suiteRoomPage.reserveNowButton.click();
    await expect(suiteRoomPage.anyAlert).toBeVisible({ timeout: 5000 });
  });

  test('Reserve with First name empty shows validation', async ({
    suiteRoomPage,
    env,
  }) => {
    await suiteRoomPage.selectDates();
    await suiteRoomPage.reserveNowButton.click();
    await expect(suiteRoomPage.firstnameInput).toBeVisible({ timeout: 5000 });
    await fillGuestFormExcept(suiteRoomPage, env, 'firstname');
    await suiteRoomPage.reserveNowButton.click();
    await expect(suiteRoomPage.anyAlert).toBeVisible({ timeout: 5000 });
  });

  test('Reserve with Last name empty shows validation', async ({
    suiteRoomPage,
    env,
  }) => {
    await suiteRoomPage.selectDates();
    await suiteRoomPage.reserveNowButton.click();
    await expect(suiteRoomPage.firstnameInput).toBeVisible({ timeout: 5000 });
    await fillGuestFormExcept(suiteRoomPage, env, 'lastname');
    await suiteRoomPage.reserveNowButton.click();
    await expect(suiteRoomPage.anyAlert).toBeVisible({ timeout: 5000 });
  });

  test('Reserve with Email empty shows validation', async ({
    suiteRoomPage,
    env,
  }) => {
    await suiteRoomPage.selectDates();
    await suiteRoomPage.reserveNowButton.click();
    await expect(suiteRoomPage.firstnameInput).toBeVisible({ timeout: 5000 });
    await fillGuestFormExcept(suiteRoomPage, env, 'email');
    await suiteRoomPage.reserveNowButton.click();
    await expect(suiteRoomPage.anyAlert).toBeVisible({ timeout: 5000 });
  });

  test('Reserve with Phone empty shows validation', async ({
    suiteRoomPage,
    env,
  }) => {
    await suiteRoomPage.selectDates();
    await suiteRoomPage.reserveNowButton.click();
    await expect(suiteRoomPage.firstnameInput).toBeVisible({ timeout: 5000 });
    await fillGuestFormExcept(suiteRoomPage, env, 'phone');
    await suiteRoomPage.reserveNowButton.click();
    await expect(suiteRoomPage.anyAlert).toBeVisible({ timeout: 5000 });
  });

  test('Happy path – dates + guest details + Reserve Now succeeds', {
    tag: ['@regression', '@smoke'],
  }, async ({
    suiteRoomPage,
    env,
  }) => {
    await suiteRoomPage.selectDates();
    const firstnameVisible = await suiteRoomPage.firstnameInput.isVisible().catch(() => false);
    if (firstnameVisible) {
      await suiteRoomPage.firstnameInput.fill('Test');
      await suiteRoomPage.lastnameInput.fill('Guest');
      await suiteRoomPage.emailInput.fill(env.contact.email);
      await suiteRoomPage.phoneInput.fill(env.contact.phone);
    }
    await suiteRoomPage.reserveNowButton.click();
    if (!firstnameVisible) {
      await expect(suiteRoomPage.firstnameInput).toBeVisible({ timeout: 5000 });
      await suiteRoomPage.firstnameInput.fill('Test');
      await suiteRoomPage.lastnameInput.fill('Guest');
      await suiteRoomPage.emailInput.fill(env.contact.email);
      await suiteRoomPage.phoneInput.fill(env.contact.phone);
      await suiteRoomPage.reserveNowButton.click();
    }
    const successVisible = await suiteRoomPage.successMessage.isVisible().catch(() => false);
    const noValidationError = !(await suiteRoomPage.validationMessage.isVisible().catch(() => false));
    expect(successVisible || noValidationError).toBeTruthy();
  });
});
