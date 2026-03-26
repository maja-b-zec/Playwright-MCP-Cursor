import { test, expect } from '../fixtures/test.js';

test.describe('Home page and navigation', () => {
  test('home page loads with correct title, welcome content, and rooms section', {
    tag: '@regression',
  }, async ({
    homePage,
    page,
    env,
  }) => {
    await homePage.goto('/');

    await expect(page).toHaveTitle(/Restful-booker-platform demo/i);
    await expect(homePage.welcomeHeading).toBeVisible();
    await expect(homePage.welcomeHeading).toHaveText('Welcome to Shady Meadows B&B');

    await expect(homePage.bookNowLink).toBeVisible();
    await expect(homePage.bookNowLink).toHaveAttribute('href', '#booking');

    await expect(homePage.roomsSectionHeading).toBeVisible();
    await expect(homePage.roomSinglePrice).toBeVisible();
    await expect(homePage.roomDoublePrice).toBeVisible();
    await expect(homePage.roomSuitePrice).toBeVisible();
  });

  test('main navigation links are visible and Admin points to admin page', async ({
    homePage,
    page,
  }) => {
    await homePage.goto('/');

    await expect(homePage.navRooms).toBeVisible();
    await expect(homePage.navBooking).toBeVisible();
    await expect(homePage.navContact).toBeVisible();
    await expect(homePage.navAdmin).toBeVisible();
    await expect(homePage.navAdmin).toHaveAttribute('href', expect.stringContaining('/admin'));

    await homePage.navAdmin.click();
    await expect(page).toHaveURL(/\/admin/);
  });

  test('Scenario 2: clicking hero Book Now repositions to booking section', async ({
    homePage,
    page,
  }) => {
    await homePage.goto('/');

    await expect(homePage.bookNowLink).toBeVisible();
    await homePage.bookNowLink.click();

    await expect(homePage.bookingSectionHeading).toBeVisible();
    await expect(homePage.bookingSectionHeading).toBeInViewport();
  });

  test('Scenario 5: user can change dates and click Check Availability to see room options', async ({
    homePage,
    page,
  }) => {
    await homePage.goto('/');

    await homePage.bookNowLink.click();
    await expect(homePage.bookingSectionHeading).toBeVisible();

    const today = new Date();
    const checkIn = new Date(today);
    checkIn.setDate(checkIn.getDate() + 7);
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + 2);
    const formatDate = (d: Date) =>
      `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;

    await homePage.bookingCheckInInput.fill(formatDate(checkIn));
    await homePage.bookingCheckOutInput.fill(formatDate(checkOut));
    await homePage.checkAvailabilityButton.click();

    await expect(
      page.getByRole('link', { name: /View Details|Book now/i }).first(),
    ).toBeVisible({ timeout: 10000 });
  });

  test('Scenario 7: clicking Single room Book now opens room booking page', async ({
    homePage,
    page,
  }) => {
    await homePage.goto('/');
    await expect(homePage.roomsSectionHeading).toBeVisible();

    await homePage.roomSingleBookNow.click();

    await expect(page.getByRole('heading', { name: 'Single Room', level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Book This Room', level: 2 })).toBeVisible();
  });

  test('Scenario 8: clicking Double room Book now opens room booking page', async ({
    homePage,
    page,
  }) => {
    await homePage.goto('/');
    await expect(homePage.roomsSectionHeading).toBeVisible();

    await homePage.roomDoubleBookNow.click();

    await expect(page.getByRole('heading', { name: /^Double/, level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Book This Room', level: 2 })).toBeVisible();
  });

  test('Scenario 9: clicking Suite room Book now opens room booking page', async ({
    homePage,
    page,
  }) => {
    await homePage.goto('/');
    await expect(homePage.roomsSectionHeading).toBeVisible();

    await homePage.roomSuiteBookNow.click();

    await expect(page.getByRole('heading', { name: /^Suite/, level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Book This Room', level: 2 })).toBeVisible();
  });

  test('Scenario 10: Our Location section has correct heading and address', async ({
    homePage,
    page,
  }) => {
    await homePage.goto('/');

    await expect(homePage.ourLocationSectionHeading).toBeVisible();
    await expect(homePage.ourLocationSectionHeading).toHaveText('Our Location');
    await expect(homePage.ourLocationAddress).toBeVisible();
  });

  test('Scenario 24: Main nav Rooms, Booking, Amenities, Location, Contact scroll to sections', async ({
    homePage,
    page,
  }) => {
    await homePage.goto('/');

    await homePage.navRooms.click();
    await expect(page).toHaveURL(/#rooms/);
    await expect(homePage.roomsSectionHeading).toBeInViewport();

    await homePage.navBooking.click();
    await expect(page).toHaveURL(/#booking/);
    await expect(homePage.bookingSectionHeading).toBeInViewport();

    await homePage.navAmenities.click();
    await expect(page).toHaveURL(/#amenities/);

    await homePage.navLocation.click();
    await expect(page).toHaveURL(/#location/);
    await expect(homePage.ourLocationSectionHeading).toBeInViewport();

    await homePage.navContact.click();
    await expect(page).toHaveURL(/#contact/);
    await expect(homePage.contactSectionHeading).toBeInViewport();
  });

  test('Scenario 25: Footer Cookie Policy and Privacy Policy links open correct pages', async ({
    homePage,
    page,
  }) => {
    await homePage.goto('/');

    await homePage.footerCookiePolicyLink.click();
    await expect(page).toHaveURL(/\/cookie/);

    await homePage.goto('/');
    await homePage.footerPrivacyPolicyLink.click();
    await expect(page).toHaveURL(/\/privacy/);
  });
});
