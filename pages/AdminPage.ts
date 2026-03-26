import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class AdminPage extends BasePage {
  constructor(page: Page, baseUrl: string) {
    super(page, baseUrl);
  }

  get loginHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Login', level: 2 });
  }

  get usernameInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Username' });
  }

  get passwordInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  get loginButton(): Locator {
    return this.page.getByRole('button', { name: 'Login' });
  }

  get logoutButton(): Locator {
    return this.page.getByRole('button', { name: 'Logout' });
  }

  /** Error or validation message after failed login (e.g. "Bad credentials", "Invalid", "Required") */
  get loginErrorMessage(): Locator {
    return this.page.getByText(/invalid|bad credentials|required|error|incorrect|failed/i);
  }
}
