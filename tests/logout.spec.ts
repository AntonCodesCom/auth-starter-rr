import test, { expect } from '@playwright/test';
import { e2eSetAccessTokenIntoSessionCookie } from './utils/logInProgrammatically';
import { faker } from '@faker-js/faker';
import makeAuthSessionUtils from '~/sessions/auth';

// local config
const waitUntil = 'domcontentloaded';

/**
 * e2e
 */
test('any access token', async ({ page, context }) => {
  // simulate an access token in cookies
  const anyAccessToken = `any-access-token-${faker.string.alphanumeric(5)}`;
  await e2eSetAccessTokenIntoSessionCookie({
    context,
    accessToken: anyAccessToken,
  });
  // start
  await page.goto('/logout', { waitUntil });
  await expect(page).toHaveURL('/login');
  // assert session cookie absence
  const cookies = await context.cookies();
  const cookieNames = cookies.map((x) => x.name);
  const { authSessionName } = makeAuthSessionUtils();
  expect(cookieNames).not.toContain(authSessionName);
});
