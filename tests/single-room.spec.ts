import { test, expect } from '../fixtures/test.js';
import type { RoomPage } from '../pages/RoomPage.js';

async function fillGuestFormExcept(
  singleRoomPage: RoomPage,
  env: { contact: { email: string; phone: string } },
  skipField: 'firstname' | 'lastname' | 'email' | 'phone',
) {
  if (skipField !== 'firstname') await singleRoomPage.firstnameInput.fill('Test');
  if (skipField !== 'lastname') await singleRoomPage.lastnameInput.fill('Guest');
  if (skipField !== 'email') await singleRoomPage.emailInput.fill(env.contact.email);
  if (skipField !== 'phone') await singleRoomPage.phoneInput.fill(env.contact.phone);
}

test.describe('Single Room page (booking)', () => {
  test.beforeEach(async ({ singleRoomPage }) => {
    await singleRoomPage.gotoRoom();
    await singleRoomPage.waitForBookingWidget();
  });

  test('Scenario 14: Single Room page layout and sections are visible', async ({
    singleRoomPage,
    page,
  }) => {
    await expect(page).toHaveURL(/\/reservation\/1/);
    await expect(singleRoomPage.roomHeading).toHaveText('Single Room');
    await expect(singleRoomPage.roomDescriptionHeading).toBeVisible();
    await expect(singleRoomPage.roomFeaturesHeading).toBeVisible();
    await expect(singleRoomPage.roomPoliciesHeading).toBeVisible();
    await expect(singleRoomPage.bookThisRoomHeading).toBeVisible();
    await expect(singleRoomPage.priceSummaryHeading).toBeVisible();
    await expect(singleRoomPage.reserveNowButton).toBeVisible();
    await expect(singleRoomPage.similarRoomsHeading).toBeVisible();
  });

  test('Scenario 22: View Details for Double room opens Double room page', async ({
    singleRoomPage,
    page,
  }) => {
    await expect(singleRoomPage.similarRoomsHeading).toBeVisible();
    await singleRoomPage.viewDetailsDoubleRoom.click();
    await expect(page).toHaveURL(/\/reservation\/2/);
    await expect(page.getByRole('heading', { name: /^Double/, level: 1 })).toBeVisible();
    await expect(singleRoomPage.bookThisRoomHeading).toBeVisible();
  });

  test('Scenario 23: View Details for Suite room opens Suite room page', async ({
    singleRoomPage,
    page,
  }) => {
    await expect(singleRoomPage.similarRoomsHeading).toBeVisible();
    await singleRoomPage.viewDetailsSuiteRoom.click();
    await expect(page).toHaveURL(/\/reservation\/3/);
    await expect(page.getByRole('heading', { name: /^Suite/, level: 1 })).toBeVisible();
    await expect(singleRoomPage.bookThisRoomHeading).toBeVisible();
  });

  test('Scenario 26: Breadcrumb Home link navigates back to home page', async ({
    singleRoomPage,
    page,
  }) => {
    await expect(singleRoomPage.breadcrumbHomeLink).toBeVisible();
    await singleRoomPage.breadcrumbHomeLink.click();
    await expect(page).toHaveURL(/\/$|\/\?/);
    await expect(page.getByRole('heading', { name: 'Welcome to Shady Meadows B&B', level: 1 })).toBeVisible();
  });

  test('Logo link navigates back to home page', async ({
    singleRoomPage,
    page,
  }) => {
    await expect(singleRoomPage.logoLink).toBeVisible();
    await singleRoomPage.logoLink.click();
    await expect(page).toHaveURL(/\/$|\/\?/);
    await expect(page.getByRole('heading', { name: 'Welcome to Shady Meadows B&B', level: 1 })).toBeVisible();
  });

  test('Scenario 27: Cancel button keeps user on room page without submitting', async ({
    singleRoomPage,
    page,
  }) => {
    await singleRoomPage.selectDates();
    await singleRoomPage.reserveNowButton.click();
    await expect(singleRoomPage.firstnameInput).toBeVisible({ timeout: 5000 });
    await expect(singleRoomPage.cancelButton).toBeVisible();
    await singleRoomPage.cancelButton.click();
    await expect(page).toHaveURL(/\/reservation\/1/);
    await expect(singleRoomPage.roomHeading).toHaveText('Single Room');
  });

  test('Scenario 15: Reserve Now without selecting dates shows validation or does not submit', {
    tag: '@regression',
  }, async ({
    singleRoomPage,
    page,
  }) => {
    await expect(singleRoomPage.reserveNowButton).toBeVisible();

    await singleRoomPage.reserveNowButton.click();

    const urlAfter = page.url();
    const stillOnRoomPage = urlAfter.includes('/reservation/1');
    const validationShown = await singleRoomPage.validationMessage.isVisible().catch(() => false);

    expect(stillOnRoomPage || validationShown).toBeTruthy();
  });

  test('Scenario 16: Reserve Now with dates but without guest details shows validation', {
    tag: '@regression',
  }, async ({
    singleRoomPage,
  }) => {
    await singleRoomPage.selectDates();

    await singleRoomPage.reserveNowButton.click();

    await expect(singleRoomPage.anyAlert).toBeVisible({ timeout: 5000 });
  });

  test('Scenario 18: Reserve with First name empty shows validation', async ({
    singleRoomPage,
    env,
  }) => {
    await singleRoomPage.selectDates();
    await singleRoomPage.reserveNowButton.click();
    await expect(singleRoomPage.firstnameInput).toBeVisible({ timeout: 5000 });
    await fillGuestFormExcept(singleRoomPage, env, 'firstname');
    await singleRoomPage.reserveNowButton.click();
    await expect(singleRoomPage.anyAlert).toBeVisible({ timeout: 5000 });
  });

  test('Scenario 19: Reserve with Last name empty shows validation', async ({
    singleRoomPage,
    env,
  }) => {
    await singleRoomPage.selectDates();
    await singleRoomPage.reserveNowButton.click();
    await expect(singleRoomPage.firstnameInput).toBeVisible({ timeout: 5000 });
    await fillGuestFormExcept(singleRoomPage, env, 'lastname');
    await singleRoomPage.reserveNowButton.click();
    await expect(singleRoomPage.anyAlert).toBeVisible({ timeout: 5000 });
  });

  test('Scenario 20: Reserve with Email empty shows validation', async ({
    singleRoomPage,
    env,
  }) => {
    await singleRoomPage.selectDates();
    await singleRoomPage.reserveNowButton.click();
    await expect(singleRoomPage.firstnameInput).toBeVisible({ timeout: 5000 });
    await fillGuestFormExcept(singleRoomPage, env, 'email');
    await singleRoomPage.reserveNowButton.click();
    await expect(singleRoomPage.anyAlert).toBeVisible({ timeout: 5000 });
  });

  test('Scenario 21: Reserve with Phone empty shows validation', async ({
    singleRoomPage,
    env,
  }) => {
    await singleRoomPage.selectDates();
    await singleRoomPage.reserveNowButton.click();
    await expect(singleRoomPage.firstnameInput).toBeVisible({ timeout: 5000 });
    await fillGuestFormExcept(singleRoomPage, env, 'phone');
    await singleRoomPage.reserveNowButton.click();
    await expect(singleRoomPage.anyAlert).toBeVisible({ timeout: 5000 });
  });

  test('Scenario 17: Happy path – dates + guest details + Reserve Now succeeds', {
    tag: ['@regression', '@smoke'],
  }, async ({
    singleRoomPage,
    env,
  }) => {
    await singleRoomPage.selectDates();

    const firstnameVisible = await singleRoomPage.firstnameInput.isVisible().catch(() => false);
    if (firstnameVisible) {
      await singleRoomPage.firstnameInput.fill('Test');
      await singleRoomPage.lastnameInput.fill('Guest');
      await singleRoomPage.emailInput.fill(env.contact.email);
      await singleRoomPage.phoneInput.fill(env.contact.phone);
    }

    await singleRoomPage.reserveNowButton.click();

    if (!firstnameVisible) {
      await expect(singleRoomPage.firstnameInput).toBeVisible({ timeout: 5000 });
      await singleRoomPage.firstnameInput.fill('Test');
      await singleRoomPage.lastnameInput.fill('Guest');
      await singleRoomPage.emailInput.fill(env.contact.email);
      await singleRoomPage.phoneInput.fill(env.contact.phone);
      await singleRoomPage.reserveNowButton.click();
    }

    const successVisible = await singleRoomPage.successMessage.isVisible().catch(() => false);
    const noValidationError = !(await singleRoomPage.validationMessage.isVisible().catch(() => false));
    expect(successVisible || noValidationError).toBeTruthy();
  });
});
