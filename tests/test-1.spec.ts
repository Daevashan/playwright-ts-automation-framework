import { test, expect } from '@playwright/test';

test('test1', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');
  await page.getByRole('link', { name: 'English 7,254,000+ articles' }).click();
  await page.locator('#vector-main-menu-dropdown-checkbox').check();
  await page.getByRole('link', { name: 'Main page', exact: true }).click();
  await page.getByRole('searchbox', { name: 'Search Wikipedia' }).click();
  await page.getByRole('combobox', { name: 'Search Wikipedia' }).fill('johnny depp');
  await page.getByRole('combobox', { name: 'Search Wikipedia' }).press('Enter');
  await page.locator('#mwAUw').getByRole('link', { name: 'Nicolas Cage' }).click();

});



test('test2', async ({ page }) => {
await page.getByRole('searchbox', { name: 'Search Amazon.co.za' }).click();
await page.getByRole('searchbox', { name: 'Search Amazon.co.za' }).fill('harry potter');
await page.getByRole('searchbox', { name: 'Search Amazon.co.za' }).press('Enter');
await page.locator('.a-link-normal.s-no-outline').first().click();
await page.getByRole('button', { name: 'Add to basket', exact: true }).click();
await page.getByRole('button', { name: 'Delete Harry Potter Box Set:' }).click();
await page.getByRole('link', { name: 'Hello, sign in Account & Lists' }).click();
await page.goto('https://www.amazon.co.za/cart/smart-wagon?newItems=a9acd70d-0ebe-4153-9d51-a180035a7349,1&ref_=sw_refresh');
await page.goto('https://www.amazon.co.za/cart/ref=sw_rv_inscr?app-nav-type=none&dc=df');

});