import test, { expect } from '@playwright/test';
import e2eLogInProgrammatically, {
  e2eSetAccessTokenIntoSessionCookie,
} from './utils/logInProgrammatically';
import { envE2E } from '~/env';
import { faker } from '@faker-js/faker';
import makeAuthSessionUtils from '~/sessions/auth';

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
test('invalid access token', async ({ page, context }) => {
  // simulate an invalid token
  const invalidAccessToken = `invalid-access-token-${faker.string.alphanumeric(5)}`;
  await e2eSetAccessTokenIntoSessionCookie({
    context,
    accessToken: invalidAccessToken,
  });
  // start
  await page.goto('/', { waitUntil });
  await expect(page).toHaveURL('/login');
  // assert session cookie absence
  const cookies = await context.cookies();
  const cookieNames = cookies.map((x) => x.name);
  const { authSessionName } = makeAuthSessionUtils();
  expect(cookieNames).not.toContain(authSessionName);
});
