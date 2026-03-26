import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  constructor(page: Page, baseUrl: string) {
    super(page, baseUrl);
  }

  get welcomeHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Welcome to Shady Meadows B&B', level: 1 });
  }

  /** Hero CTA "Book Now" (exact to avoid room card "Book now" links) */
  get bookNowLink(): Locator {
    return this.page.getByRole('link', { name: 'Book Now', exact: true });
  }

  private get mainNav(): Locator {
    return this.page.getByRole('navigation').first();
  }

  get navRooms(): Locator {
    return this.mainNav.getByRole('link', { name: 'Rooms' });
  }

  get navBooking(): Locator {
    return this.mainNav.getByRole('link', { name: 'Booking' });
  }

  get navAmenities(): Locator {
    return this.mainNav.getByRole('link', { name: 'Amenities' });
  }

  get navLocation(): Locator {
    return this.mainNav.getByRole('link', { name: 'Location' });
  }

  get navContact(): Locator {
    return this.mainNav.getByRole('link', { name: 'Contact' });
  }

  get navAdmin(): Locator {
    return this.mainNav.getByRole('link', { name: 'Admin' });
  }

  /** Footer: Cookie Policy link (goes to /cookie) */
  get footerCookiePolicyLink(): Locator {
    return this.page.getByRole('link', { name: /Cookie Policy|Cookie-Policy/i });
  }

  /** Footer: Privacy Policy link (goes to /privacy) */
  get footerPrivacyPolicyLink(): Locator {
    return this.page.getByRole('link', { name: /Privacy Policy|Privacy-Policy/i });
  }

  get roomsSectionHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Our Rooms', level: 2 });
  }

  /** Container for the Our Rooms section (to scope room card links) */
  private get roomsSection(): Locator {
    return this.roomsSectionHeading.locator('../..');
  }

  /** "Book now" link in the Single room card (first room in Our Rooms section) */
  get roomSingleBookNow(): Locator {
    return this.roomsSection.getByRole('link', { name: 'Book now' }).nth(0);
  }

  /** "Book now" link in the Double room card */
  get roomDoubleBookNow(): Locator {
    return this.roomsSection.getByRole('link', { name: 'Book now' }).nth(1);
  }

  /** "Book now" link in the Suite room card */
  get roomSuiteBookNow(): Locator {
    return this.roomsSection.getByRole('link', { name: 'Book now' }).nth(2);
  }

  get roomSinglePrice(): Locator {
    return this.page.getByText('£100 per night').first();
  }

  get roomDoublePrice(): Locator {
    return this.page.getByText('£150 per night').first();
  }

  get roomSuitePrice(): Locator {
    return this.page.getByText('£225 per night').first();
  }

  /** Booking section heading – "Check Availability & Book Your Stay" (level 3 on site) */
  get bookingSectionHeading(): Locator {
    return this.page.getByRole('heading', {
      name: 'Check Availability & Book Your Stay',
      level: 3,
    });
  }

  /** Container for the booking form (Check Availability section) */
  private get bookingSection(): Locator {
    return this.bookingSectionHeading.locator('../..');
  }

  /** Check In date textbox (first textbox in booking section) */
  get bookingCheckInInput(): Locator {
    return this.bookingSection.getByRole('textbox').first();
  }

  /** Check Out date textbox (second textbox in booking section) */
  get bookingCheckOutInput(): Locator {
    return this.bookingSection.getByRole('textbox').nth(1);
  }

  get checkAvailabilityButton(): Locator {
    return this.page.getByRole('button', { name: 'Check Availability' });
  }

  get ourLocationSectionHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Our Location', level: 2 });
  }

  /** Address in the Our Location section only (scoped to #location to avoid footer duplicate) */
  get ourLocationAddress(): Locator {
    return this.page
      .locator('#location')
      .getByText(
        'Shady Meadows B&B, Shadows valley, Newingtonfordburyshire, Dilbery, N1 1AA',
      );
  }

  get contactSectionHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Send Us a Message', level: 3 });
  }

  get contactNameInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Name' });
  }

  get contactEmailInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Email' });
  }

  get contactPhoneInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Phone' });
  }

  get contactSubjectInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Subject' });
  }

  get contactFormSection(): Locator {
    return this.page
      .getByRole('heading', { name: 'Send Us a Message' })
      .locator('../..');
  }

  get contactMessageInput(): Locator {
    return this.contactFormSection.getByRole('textbox').nth(4);
  }

  get contactSubmitButton(): Locator {
    return this.page.getByRole('button', { name: 'Submit' });
  }

  /** Success or feedback message anywhere on page after contact form submit */
  get contactSuccessMessage(): Locator {
    return this.page.getByText(/thank|success|sent|received|submitted|we have received/i);
  }
}
