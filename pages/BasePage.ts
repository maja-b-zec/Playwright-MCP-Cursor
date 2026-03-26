import { Page } from '@playwright/test';

export abstract class BasePage {
  constructor(
    protected readonly page: Page,
    protected readonly baseUrl: string
  ) {}

  async goto(path: string = ''): Promise<void> {
    const url = path.startsWith('http') ? path : `${this.baseUrl}${path || ''}`;
    await this.page.goto(url);
  }
}
