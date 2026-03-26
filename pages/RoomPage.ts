import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';

/**
 * Page object for a room reservation/detail page (e.g. /reservation/1 for Single room).
 * Used for Single, Double, and Suite room booking flows.
 */
export class RoomPage extends BasePage {
  constructor(page: Page, baseUrl: string, private readonly roomId: number) {
    super(page, baseUrl);
  }

  /** Path for this room's reservation page. With checkin/checkout the booking widget (calendar, Reserve Now) is shown. */
  get reservationPath(): string {
    const checkIn = new Date();
    checkIn.setDate(checkIn.getDate() + 7);
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + 2);
    const fmt = (d: Date) => d.toISOString().slice(0, 10);
    return `/reservation/${this.roomId}?checkin=${fmt(checkIn)}&checkout=${fmt(checkOut)}`;
  }

  async gotoRoom(): Promise<void> {
    await this.goto(this.reservationPath);
  }

  /** Main room heading (e.g. "Single Room", "Double", "Suite") */
  get roomHeading(): Locator {
    return this.page.getByRole('heading', { level: 1 }).first();
  }

  get roomDescriptionHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Room Description', level: 2 });
  }

  get roomFeaturesHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Room Features', level: 2 });
  }

  get roomPoliciesHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Room Policies', level: 2 });
  }

  /** "Book This Room" section heading (may load after calendar) */
  get bookThisRoomHeading(): Locator {
    return this.page.getByRole('heading', { name: /Book This Room/i });
  }

  get reserveNowButton(): Locator {
    return this.page.getByRole('button', { name: 'Reserve Now' });
  }

  /** Cancel button in the booking form (next to Reserve Now) */
  get cancelButton(): Locator {
    return this.page.getByRole('button', { name: 'Cancel' });
  }

  /** Breadcrumb "Home" link – navigates back to home page (first "Home" link is in breadcrumb) */
  get breadcrumbHomeLink(): Locator {
    return this.page.getByRole('link', { name: 'Home' }).first();
  }

  get priceSummaryHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Price Summary', level: 3 });
  }

  get similarRoomsHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Similar Rooms You Might Like', level: 2 });
  }

  /** Container for the "Similar Rooms You Might Like" section (to scope View Details links) */
  private get similarRoomsSection(): Locator {
    return this.similarRoomsHeading.locator('../..');
  }

  /** "View Details" link for the Double room in Similar Rooms (when on Single room page) */
  get viewDetailsDoubleRoom(): Locator {
    return this.similarRoomsSection.getByRole('link', { name: 'View Details' }).first();
  }

  /** "View Details" link for the Suite room in Similar Rooms (when on Single room page) */
  get viewDetailsSuiteRoom(): Locator {
    return this.similarRoomsSection.getByRole('link', { name: 'View Details' }).nth(1);
  }

  /** "View Details" link for a specific room in Similar Rooms (e.g. "Single Room", "Double", "Suite"). Use from any room page. */
  viewDetailsForRoom(roomName: string): Locator {
    const card = this.similarRoomsSection.getByRole('heading', {
      name: new RegExp(roomName, 'i'),
    }).locator('../..');
    return card.getByRole('link', { name: 'View Details' });
  }

  /** Wait for the booking widget (calendar + Reserve Now) to be ready */
  async waitForBookingWidget(): Promise<void> {
    await this.reserveNowButton.waitFor({ state: 'visible', timeout: 15000 });
  }

  /** Calendar table "Month View" */
  private get calendarTable(): Locator {
    return this.page.getByRole('table', { name: 'Month View' });
  }

  /** Date buttons in the calendar (day numbers 1–31). Excludes "Unavailable" and "Selected" cells. */
  get calendarDateButtons(): Locator {
    return this.calendarTable.getByRole('button', { name: /^\d{1,2}$/ });
  }

  /** First name (accessible name on site is "Firstname"; unique on page) */
  get firstnameInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Firstname' });
  }

  get lastnameInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Lastname' });
  }

  /** Email in booking form (first Email textbox; contact form has second) */
  get emailInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Email' }).first();
  }

  get phoneInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Phone' }).first();
  }

  /** Any alert (e.g. validation or success message) */
  get anyAlert(): Locator {
    return this.page.getByRole('alert');
  }

  /** Validation/error message (error wording; used to assert no error on happy path) */
  get validationMessage(): Locator {
    return this.page
      .getByRole('alert')
      .filter({ hasText: /required|must|invalid|error|please/i });
  }

  /** Success/confirmation after booking (avoids matching nav "Booking" link) */
  get successMessage(): Locator {
    return this.page.getByText(
      /(?:thank you|success(?:fully)?|confirmed|reservation (?:received|confirmed)|completed)/i,
    );
  }

  /**
   * Select check-in and check-out by clicking two available date buttons.
   * Clicks the first and third available day buttons (e.g. day 5 and day 7).
   */
  async selectDates(): Promise<void> {
    await this.calendarTable.waitFor({ state: 'visible' });
    const buttons = this.calendarDateButtons;
    await buttons.nth(0).click();
    await buttons.nth(2).click();
  }
}
