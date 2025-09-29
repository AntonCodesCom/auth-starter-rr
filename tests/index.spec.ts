import test, { expect } from '@playwright/test';
import e2eLogInProgrammatically from './utils/logInProgrammatically';
import { envE2E } from '~/env';

// env e2e
const { e2ePassword, e2eUsername } = envE2E();

// local config
const waitUntil = 'domcontentloaded';

/**
 * e2e
 */
test('authenticated', async ({ page, context }) => {
  // log in programmatically
  await e2eLogInProgrammatically({
    context,
    username: e2eUsername,
    password: e2ePassword,
  });
  // start
  await page.goto('/', { waitUntil });
  await expect(page).toHaveURL('/restricted');
});

/**
 * e2e
 */
test('no access token', async ({ page }) => {
  await page.goto('/', { waitUntil });
  await expect(page).toHaveURL('/login');
});

/**
 * e2e
 */
test.skip('invalid access token', async ({ page }) => {});
