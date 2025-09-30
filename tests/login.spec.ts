import { faker } from '@faker-js/faker';
import test, { expect } from '@playwright/test';
import { e2eSetAccessTokenIntoSessionCookie } from './utils/logInProgrammatically';

// local config
const waitUntil = 'domcontentloaded';

/**
 * e2e
 */
test('existing invalid access token', async ({ page, context }) => {
  // simulate an access token in cookies
  const anyAccessToken = `any-access-token-${faker.string.alphanumeric(5)}`;
  await e2eSetAccessTokenIntoSessionCookie({
    context,
    accessToken: anyAccessToken,
  });
  // start
  await page.goto('/login', { waitUntil });
  await expect(page).toHaveURL('/login');
});
