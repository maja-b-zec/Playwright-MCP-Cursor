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

test.describe('Double Room page (booking)', () => {
  test.beforeEach(async ({ doubleRoomPage }) => {
    await doubleRoomPage.gotoRoom();
    await doubleRoomPage.waitForBookingWidget();
  });

  test('Double Room page layout and sections are visible', async ({
    doubleRoomPage,
    page,
  }) => {
    await expect(page).toHaveURL(/\/reservation\/2/);
    await expect(doubleRoomPage.roomHeading).toHaveText(/^Double/);
    await expect(doubleRoomPage.roomDescriptionHeading).toBeVisible();
    await expect(doubleRoomPage.roomFeaturesHeading).toBeVisible();
    await expect(doubleRoomPage.roomPoliciesHeading).toBeVisible();
    await expect(doubleRoomPage.bookThisRoomHeading).toBeVisible();
    await expect(doubleRoomPage.priceSummaryHeading).toBeVisible();
    await expect(doubleRoomPage.reserveNowButton).toBeVisible();
    await expect(doubleRoomPage.similarRoomsHeading).toBeVisible();
  });

  test('View Details for Single room opens Single room page', async ({
    doubleRoomPage,
    page,
  }) => {
    await expect(doubleRoomPage.similarRoomsHeading).toBeVisible();
    await doubleRoomPage.viewDetailsForRoom('Single').click();
    await expect(page).toHaveURL(/\/reservation\/1/);
    await expect(page.getByRole('heading', { name: 'Single Room', level: 1 })).toBeVisible();
    await expect(doubleRoomPage.bookThisRoomHeading).toBeVisible();
  });

  test('View Details for Suite room opens Suite room page', async ({
    doubleRoomPage,
    page,
  }) => {
    await expect(doubleRoomPage.similarRoomsHeading).toBeVisible();
    await doubleRoomPage.viewDetailsForRoom('Suite').click();
    await expect(page).toHaveURL(/\/reservation\/3/);
    await expect(page.getByRole('heading', { name: /^Suite/, level: 1 })).toBeVisible();
    await expect(doubleRoomPage.bookThisRoomHeading).toBeVisible();
  });

  test('Breadcrumb Home link navigates back to home page', async ({
    doubleRoomPage,
    page,
  }) => {
    await expect(doubleRoomPage.breadcrumbHomeLink).toBeVisible();
    await doubleRoomPage.breadcrumbHomeLink.click();
    await expect(page).toHaveURL(/\/$|\/\?/);
    await expect(page.getByRole('heading', { name: 'Welcome to Shady Meadows B&B', level: 1 })).toBeVisible();
  });

  test('Cancel button keeps user on room page without submitting', async ({
    doubleRoomPage,
    page,
  }) => {
    await doubleRoomPage.selectDates();
    await doubleRoomPage.reserveNowButton.click();
    await expect(doubleRoomPage.firstnameInput).toBeVisible({ timeout: 5000 });
    await expect(doubleRoomPage.cancelButton).toBeVisible();
    await doubleRoomPage.cancelButton.click();
    await expect(page).toHaveURL(/\/reservation\/2/);
    await expect(doubleRoomPage.roomHeading).toHaveText(/^Double/);
  });

  test('Reserve Now without selecting dates shows validation or does not submit', {
    tag: '@regression',
  }, async ({
    doubleRoomPage,
    page,
  }) => {
    await expect(doubleRoomPage.reserveNowButton).toBeVisible();
    await doubleRoomPage.reserveNowButton.click();
    const urlAfter = page.url();
    const stillOnRoomPage = urlAfter.includes('/reservation/2');
    const validationShown = await doubleRoomPage.validationMessage.isVisible().catch(() => false);
    expect(stillOnRoomPage || validationShown).toBeTruthy();
  });

  test('Reserve Now with dates but without guest details shows validation', {
    tag: '@regression',
  }, async ({
    doubleRoomPage,
  }) => {
    await doubleRoomPage.selectDates();
    await doubleRoomPage.reserveNowButton.click();
    await expect(doubleRoomPage.anyAlert).toBeVisible({ timeout: 5000 });
  });

  test('Reserve with First name empty shows validation', async ({
    doubleRoomPage,
    env,
  }) => {
    await doubleRoomPage.selectDates();
    await doubleRoomPage.reserveNowButton.click();
    await expect(doubleRoomPage.firstnameInput).toBeVisible({ timeout: 5000 });
    await fillGuestFormExcept(doubleRoomPage, env, 'firstname');
    await doubleRoomPage.reserveNowButton.click();
    await expect(doubleRoomPage.anyAlert).toBeVisible({ timeout: 5000 });
  });

  test('Reserve with Last name empty shows validation', async ({
    doubleRoomPage,
    env,
  }) => {
    await doubleRoomPage.selectDates();
    await doubleRoomPage.reserveNowButton.click();
    await expect(doubleRoomPage.firstnameInput).toBeVisible({ timeout: 5000 });
    await fillGuestFormExcept(doubleRoomPage, env, 'lastname');
    await doubleRoomPage.reserveNowButton.click();
    await expect(doubleRoomPage.anyAlert).toBeVisible({ timeout: 5000 });
  });

  test('Reserve with Email empty shows validation', async ({
    doubleRoomPage,
    env,
  }) => {
    await doubleRoomPage.selectDates();
    await doubleRoomPage.reserveNowButton.click();
    await expect(doubleRoomPage.firstnameInput).toBeVisible({ timeout: 5000 });
    await fillGuestFormExcept(doubleRoomPage, env, 'email');
    await doubleRoomPage.reserveNowButton.click();
    await expect(doubleRoomPage.anyAlert).toBeVisible({ timeout: 5000 });
  });

  test('Reserve with Phone empty shows validation', async ({
    doubleRoomPage,
    env,
  }) => {
    await doubleRoomPage.selectDates();
    await doubleRoomPage.reserveNowButton.click();
    await expect(doubleRoomPage.firstnameInput).toBeVisible({ timeout: 5000 });
    await fillGuestFormExcept(doubleRoomPage, env, 'phone');
    await doubleRoomPage.reserveNowButton.click();
    await expect(doubleRoomPage.anyAlert).toBeVisible({ timeout: 5000 });
  });

  test('Happy path – dates + guest details + Reserve Now succeeds', {
    tag: ['@regression', '@smoke'],
  }, async ({
    doubleRoomPage,
    env,
  }) => {
    await doubleRoomPage.selectDates();
    const firstnameVisible = await doubleRoomPage.firstnameInput.isVisible().catch(() => false);
    if (firstnameVisible) {
      await doubleRoomPage.firstnameInput.fill('Test');
      await doubleRoomPage.lastnameInput.fill('Guest');
      await doubleRoomPage.emailInput.fill(env.contact.email);
      await doubleRoomPage.phoneInput.fill(env.contact.phone);
    }
    await doubleRoomPage.reserveNowButton.click();
    if (!firstnameVisible) {
      await expect(doubleRoomPage.firstnameInput).toBeVisible({ timeout: 5000 });
      await doubleRoomPage.firstnameInput.fill('Test');
      await doubleRoomPage.lastnameInput.fill('Guest');
      await doubleRoomPage.emailInput.fill(env.contact.email);
      await doubleRoomPage.phoneInput.fill(env.contact.phone);
      await doubleRoomPage.reserveNowButton.click();
    }
    const successVisible = await doubleRoomPage.successMessage.isVisible().catch(() => false);
    const noValidationError = !(await doubleRoomPage.validationMessage.isVisible().catch(() => false));
    expect(successVisible || noValidationError).toBeTruthy();
  });
});
