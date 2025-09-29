import test, { expect } from "@playwright/test";

// local config
const waitUntil = 'domcontentloaded'

/**
 * e2e
 */
test.skip('authenticated', async ({ page }) => {})

/**
 * e2e
 */
test('no access token', async ({ page }) => {
  await page.goto('/', {waitUntil})
  await expect(page).toHaveURL('/login')
})

/**
 * e2e
 */
test.skip('invalid access token', async ({ page }) => {})
