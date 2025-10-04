import test, { expect } from '@playwright/test';
import e2eLogInProgrammatically, {
  e2eSetAccessTokenIntoSessionCookie,
} from './utils/logInProgrammatically';
import { envE2E } from '~/env';
import { faker } from '@faker-js/faker';
import e2eConfig from './config';

// env e2e
const { E2E_PASSWORD: e2ePassword, E2E_USERNAME: e2eUsername } = envE2E();

// e2e config
const { defaultRestrictedRoutePathname, defaultRestrictedRouteLabel } =
  e2eConfig;

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
  await page.goto(defaultRestrictedRoutePathname, { waitUntil });
  const heading = page.getByText(defaultRestrictedRouteLabel, { exact });
  await expect(heading).toBeVisible();
  // server response assertions would typically go here, skipping for this demo route
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
  await page.goto(defaultRestrictedRoutePathname, { waitUntil });
  const restrictedHeading = page.getByText(defaultRestrictedRouteLabel, {
    exact,
  });
  await expect(restrictedHeading).not.toBeVisible();
  const unauthorizedHeading = page.getByText('401 Unauthorized', { exact });
  await expect(unauthorizedHeading).toBeVisible();
});
