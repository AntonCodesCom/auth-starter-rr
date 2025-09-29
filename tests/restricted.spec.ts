import test, { expect } from "@playwright/test";

// local config
const waitUntil = 'domcontentloaded'
const exact = true

/**
 * e2e
 */
test('authenticated', async ({page}) => {
  // TODO: log in programmatically
  // start
  await page.goto('/restricted', { waitUntil })
  const heading = page.getByText('Restricted Route', { exact })
  await expect(heading).toBeVisible()
});

/**
 * e2e
 */
test.skip('no access token', async ({ page }) => {})

/**
 * e2e
 */
test.skip('invalid access token', async ({ page }) => {})
