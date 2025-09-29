import test, { expect } from '@playwright/test';
import e2eLogInProgrammatically from './utils/logInProgrammatically';
import { envE2E } from '~/env';

// env e2e
const { e2ePassword, e2eUsername } = envE2E();

// local config
const waitUntil = 'domcontentloaded';
const exact = true;

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
  await page.goto('/restricted', { waitUntil });
  const heading = page.getByText('Restricted Route', { exact });
  await expect(heading).toBeVisible();
});

/**
 * e2e
 */
test.skip('no access token', async ({ page }) => {});

/**
 * e2e
 */
test.skip('invalid access token', async ({ page }) => {});
