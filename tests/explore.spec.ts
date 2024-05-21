// import { test, type Page,  expect } from '@playwright/test';
//
// test.describe.configure({ mode: 'serial' });
// let page : Page;
// test.beforeAll(async ({ browser }) => {
//     console.log('Before tests');
//     page = await browser.newPage();
//     await page.goto('/login');
//
//     // Click the get started link.
//     await page.getByPlaceholder('Email address').fill('playwright@gmail.com');
//     await page.getByPlaceholder('Password').fill('PlayWright1?');
//     await page.getByRole('button', {name: "Log In"}).click()
// });
// test.afterAll(async () => {
//     const signOutButton = await page.$('button[aria-label="Sign Out"]');
//     expect(signOutButton).not.toBeNull();
//     await signOutButton.click();
//     await page.close();
// });
// test('Retrieve Points', async ({ page }) => {
//
//     const marker_cluster = await page.getByRole('button', { name: '66' }).waitFor();
//     await page.getByRole('button', { name: '66' }).click();
//     const marker = page.getByRole('button', {name: 'Marker'});
//
//     // expect(cluster).not.toBeNull();
//     expect(marker_cluster).not.toBeNull();
//     expect(marker).not.toBeNull();
// });
//
// // await page.goto('http://localhost:3000/home');
// // await page.getByRole('button', { name: 'Login' }).click();
// // await page.getByPlaceholder('Email address').click();
// // await page.getByPlaceholder('Email address').fill('PlayWright1?');
// // await page.getByPlaceholder('Email address').press('Control+z');
// // await page.getByPlaceholder('Password').click();
// // await page.getByPlaceholder('Password').fill('PlayWright1?');
// // await page.getByPlaceholder('Email address').click();
// // await page.getByPlaceholder('Email address').fill('playwright@gmail.com');
// // await page.getByRole('button', { name: 'Log In' }).click();
// // await page.getByRole('button', { name: '66' }).click();
// // await page.getByRole('button', { name: 'Marker' }).first().click();
// // await page.locator('.searchBar_input__button__9uAT7').first().click();
// // await page.getByRole('button', { name: 'Friends' }).click();
// // await page.locator('.searchBar_input__button__9uAT7').first().click();
// // await page.getByRole('button', { name: 'Personal' }).click();
// // await page.locator('.searchBar_input__button__9uAT7').first().click();
// // await page.locator('.searchBar_container__marker__MbbqI > .searchBar_input__button__9uAT7').click();
// // await page.locator('.searchBar_input__button__9uAT7').first().click();
// // await page.getByRole('button', { name: 'Top Picks' }).click();
// // await page.getByRole('button', { name: 'Marker' }).click();
// // await page.getByRole('button', { name: 'Marker' }).click();
// // await page.getByRole('button', { name: 'Marker' }).click();
// // await page.locator('.checkin_container__uW9Ef > button:nth-child(2)').click();
// // await page.getByRole('button', { name: 'Submit' }).click();
// // await page.locator('div').filter({ hasText: 'error' }).nth(1).click();
// // await page.getByLabel('Unhandled Runtime Error').getByLabel('Close').click();
// // await page.getByLabel('Close').click();
// // await page.getByRole('link').first().click();
// // await page.getByText('error').click();
// // await page.getByLabel('Close').click();
// // await page.getByPlaceholder('find user').dblclick();
// // await page.getByPlaceholder('find user').fill('dovydas.vilkevicius@gmail.com');
// // await page.getByPlaceholder('find user').press('Enter');
// // await page.goto('http://localhost:3000/auth/friends');
// // await page.getByRole('link').nth(1).click();
// // await page.getByRole('link', { name: 'profile picture' }).click();
// // await page.getByRole('link').nth(1).click();
// // await page.getByRole('link').first().click();