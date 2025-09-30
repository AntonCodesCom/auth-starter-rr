import { faker } from '@faker-js/faker';
import test, { expect } from '@playwright/test';
import e2eLogInProgrammatically, {
  e2eSetAccessTokenIntoSessionCookie,
} from './utils/logInProgrammatically';
import { envE2E } from '~/env';
import makeAuthSessionUtils from '~/sessions/auth';

// env e2e
const { e2ePassword, e2eUsername } = envE2E();

// local config
const waitUntil = 'domcontentloaded';
const exact = true;

/**
 * e2e
 */
test('happy path', async ({ page }) => {
  // start
  await page.goto('/login', { waitUntil });
  // login form
  const form = page.getByRole('form', { name: 'Login', exact });
  await expect(form).toBeVisible();
  const usernameInput = form.getByRole('textbox', { name: 'Username', exact });
  await expect(usernameInput).toBeVisible();
  await usernameInput.fill(e2eUsername);
  const passwordInput = form.getByRole('textbox', { name: 'Password', exact });
  await expect(passwordInput).toBeVisible();
  await passwordInput.fill(e2ePassword);
  const submitButton = page.getByRole('button', { name: 'Log In', exact });
  await expect(submitButton).toBeVisible();
  await submitButton.click();
  await expect(page).toHaveURL('/restricted');
});

/**
 * e2e
 */
test.skip('invalid credentials', async ({ page }) => {});

/**
 * e2e
 *
 * this test duplicates the index route e2e test to some degree
 * TODO: find a way to assert redirection to "/"
 */
test('existing valid access token', async ({ page, context }) => {
  // log in programmatically
  await e2eLogInProgrammatically({
    context,
    username: e2eUsername,
    password: e2ePassword,
  });
  // start
  await page.goto('/login', { waitUntil });
  await expect(page).toHaveURL('/restricted');
});

/**
 * e2e
 *
 * this test duplicates the index route e2e test to some degree
 * TODO: find a way to assert redirection to "/"
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
  // assert session cookie absence
  const cookies = await context.cookies();
  const cookieNames = cookies.map((x) => x.name);
  const { authSessionName } = makeAuthSessionUtils();
  expect(cookieNames).not.toContain(authSessionName);
});
