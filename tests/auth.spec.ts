import { test, expect } from '@playwright/test';

test('Go to login', async ({ page }) => {
  await page.goto('/home');
  await page.getByRole('button', {name: "Login"}).click()
  await expect(page).toHaveURL("/login")
});

test('Go to SignUp', async ({ page }) => {
  await page.goto('/home');
  await page.getByRole('button', {name: "Sign Up"}).click()
  await expect(page).toHaveURL("/signup")
});

test('Valid Login/Sign Out', async ({ page }) => {
  await page.goto('/login');

  // Click the get started link.
  await page.getByPlaceholder('Email address').fill('playwright@gmail.com');
  await page.getByPlaceholder('Password').fill('PlayWright1?');
  await page.getByRole('button', {name: "Log In"}).click()

  // Expects page to have a heading with the name of Installation.
  await expect(page).toHaveURL("/auth/explore")
  const signOutButton = await page.$('button[aria-label="Sign Out"]');
  expect(signOutButton).not.toBeNull();
  await signOutButton.click();

  await expect(page).toHaveURL("/login")
});

test('Unregistered user', async ({ page }) => {
  await page.goto('/login');

  // Click the get started link.
  await page.getByPlaceholder('Email address').fill('fakeuser@login.com');
  await page.getByPlaceholder('Password').fill('fakeUser123');
  await page.getByRole('button', {name: "Log In"}).click()

  // Expects page to have a heading with the name of Installation.
  await expect(page).toHaveURL("/login")

  await page.goto('/auth/explore')
  await expect(page).toHaveURL("/login")

  await page.goto('/auth/profile')
  await expect(page).toHaveURL("/login")

  await page.goto('/auth/friends')
  await expect(page).toHaveURL("/login")

});

test('Sign Up Form Validation', async ({ page }) => {
  await page.goto('/signup');
  await page.getByRole('button', {name: "Create an account"}).click()
  const formValidation = await page.$('input[aria-invalid="true"]');
  await expect(page).toHaveURL("/signup")
  expect(formValidation).not.toBeNull();
});
