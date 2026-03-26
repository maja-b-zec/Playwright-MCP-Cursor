import { test as base } from '@playwright/test';
import { getEnv } from './env.js';
import { HomePage } from '../pages/HomePage.js';
import { AdminPage } from '../pages/AdminPage.js';
import { RoomPage } from '../pages/RoomPage.js';

type Fixtures = {
  env: ReturnType<typeof getEnv>;
  homePage: HomePage;
  adminPage: AdminPage;
  /** Single room reservation page (roomId 1) */
  singleRoomPage: RoomPage;
  /** Double room reservation page (roomId 2) */
  doubleRoomPage: RoomPage;
  /** Suite room reservation page (roomId 3) */
  suiteRoomPage: RoomPage;
};

export const test = base.extend<Fixtures>({
  env: async ({}, use) => {
    await use(getEnv());
  },

  baseURL: async ({ env }, use) => {
    await use(env.baseUrl);
  },

  homePage: async ({ page, env }, use) => {
    const homePage = new HomePage(page, env.baseUrl);
    await use(homePage);
  },

  adminPage: async ({ page, env }, use) => {
    const adminPage = new AdminPage(page, env.baseUrl);
    await use(adminPage);
  },

  singleRoomPage: async ({ page, env }, use) => {
    const roomPage = new RoomPage(page, env.baseUrl, 1);
    await use(roomPage);
  },

  doubleRoomPage: async ({ page, env }, use) => {
    const roomPage = new RoomPage(page, env.baseUrl, 2);
    await use(roomPage);
  },

  suiteRoomPage: async ({ page, env }, use) => {
    const roomPage = new RoomPage(page, env.baseUrl, 3);
    await use(roomPage);
  },
});

export { expect } from '@playwright/test';
