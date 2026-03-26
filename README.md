# Playwright E2E Tests – automationintesting.online

TypeScript Playwright tests for **https://automationintesting.online** (Shady Meadows B&B demo). Test scenarios were discovered using the **official Playwright MCP Server** ([microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp)); the test suite uses the Playwright Test runner and Page Object Model.

## Prerequisites

- **Node.js** 18+
- **npm** (or yarn/pnpm)
- **Java 8+** (for Allure Report) – set `JAVA_HOME` if needed

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Install Playwright browsers** (once)

   ```bash
   npx playwright install
   ```

3. **Configure credentials** (optional)

   Edit `env.json` and set `baseUrl`, `admin.username`, `admin.password`, and `contact` fields as needed. Do not commit real credentials; use `env.json.example` as a template and keep `env.json` in `.gitignore`.

## Running tests

- **Run all tests (headless)**

  ```bash
  npm test
  ```

- **Run with browser UI visible**

  ```bash
  npm run test:headed
  ```

- **Run with Playwright UI**

  ```bash
  npm run test:ui
  ```

- **Debug**

  ```bash
  npm run test:debug
  ```

- **Allure Report** (after running tests)

  Tests write Allure results to `allure-results/`. To view the report:

  ```bash
  npm run allure:serve
  ```

  This generates the HTML report and opens it in your browser. Alternatively:

  ```bash
  npm run allure:generate   # generates allure-report/
  npx allure open allure-report
  ```

  **Note:** Allure Report requires Java 8+ and `allure-commandline` (installed as a dev dependency). If `allure` is not found, run `npx allure serve allure-results`.

- **Run a single file**

  ```bash
  npx playwright test tests/home-and-navigation.spec.ts
  ```

## Project structure

```
├── docs/
│   └── TEST_SCENARIOS.md    # Scenarios derived via Playwright MCP Server
├── fixtures/
│   ├── env.ts               # Loads env.json (baseUrl, admin, contact)
│   └── test.ts              # Custom test fixture (env, homePage, adminPage)
├── pages/
│   ├── BasePage.ts          # Base class with goto()
│   ├── HomePage.ts          # Home page locators and sections
│   └── AdminPage.ts         # Admin login page locators
├── tests/
│   ├── home-and-navigation.spec.ts   # Home content + nav
│   ├── contact-form.spec.ts          # Contact form submit
│   └── admin-login.spec.ts           # Admin login flow
├── env.json                 # Config & credentials (do not commit secrets)
├── package.json
├── tsconfig.json
└── README.md
```

## Test scenarios and coverage

See **`docs/TEST_SCENARIOS.md`** for the full list of scenarios (home, navigation, booking, rooms, contact, admin, footer). The current suite implements:

1. **Home page and navigation** – Title, welcome heading, "Book Now" link, rooms section and prices; main nav links and Admin href.
2. **Contact form** – All fields visible, fill and submit, assert success feedback (alert).
3. **Admin login** – Login form visible, login with credentials from `env.json`, assert Logout visible.

Assertions use `expect` from `@playwright/test` (visibility, text, attributes, URL).

## Playwright MCP Server vs tests

- **Playwright MCP Server** was used to explore the site (navigate, snapshot, click) and to document scenarios in `docs/TEST_SCENARIOS.md`. Use the **playwright** MCP server in Cursor (not playwright-test) for that.
- **These tests** run with the standard Playwright Test runner (`npx playwright test`) and do not require MCP at runtime.

## Credentials and env.json

- **env.json** holds `baseUrl`, `admin` (username/password), and `contact` (form data).
- Use strong, non-default credentials in real environments and keep `env.json` out of version control (see `.gitignore`).
