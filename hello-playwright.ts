import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');
  await page.getByRole('link', { name: 'Français 2 783 000+ articles' }).click();
  await page.locator('section').click();
  await page.getByRole('listitem').filter({ hasText: 'Portails thématiques' }).click();
});