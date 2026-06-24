import { test, expect, Page } from '@playwright/test';
import LoginPage from '../pages1/login.ts';

  
test('Verify valid login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await loginPage.enterusername('student');
  await loginPage.enterpassword('Password123');
  await loginPage.clickloginbutton();
  await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/');
  await expect(page).toHaveTitle("Logged In Successfully | Practice Test Automation");
  await expect(page.locator("h1")).toContainText("Logged In Successfully"); 
  await expect(page.getByText("Logged in successfully")).toBeVisible(); 
});

test('Login with invalid username', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await loginPage.enterusername('wronguser');
  await loginPage.enterpassword('Password123');
  await loginPage.clickloginbutton();
  await expect(page.getByText('Your username is invalid!').first()).toBeVisible();
  await expect(page.locator("#error")).toBeVisible();
  await expect(page.locator("#error")).toContainText("Your username is invalid!");
});

test('Login with invalid password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await loginPage.enterusername('student');
  await loginPage.enterpassword('wrongpassword');
  await loginPage.clickloginbutton();
  //await loginPage.verifyErrorMessage('Your password is invalid!'); //Used POM to verify error message
  
});

test('Login without username', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await loginPage.enterusername('');
  await loginPage.enterpassword('Password123');
  await loginPage.clickloginbutton();
  await expect(page.getByText('Your username is invalid!').first()).toBeVisible();
  await expect(page.locator("#error")).toBeVisible();
  await expect(page.locator("#error")).toContainText("Your username is invalid!");
});

test('Login without password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await loginPage.enterusername('student');
  await loginPage.enterpassword('');
  await loginPage.clickloginbutton();
  await expect(page.getByText('Your password is invalid!').first()).toBeVisible();
  await expect(page.locator("#error")).toBeVisible();
  await expect(page.locator("#error")).toContainText('Your password is invalid!');
});

test('Login with empty credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('https://practicetestautomation.com/practice-test-login/');

  await loginPage.enterusername('');
  await loginPage.enterpassword('');
  await loginPage.clickloginbutton();
  await expect(page.getByText('Your username is invalid!').first()).toBeVisible();
  await expect(page.locator("#error")).toBeVisible();
  await expect(page.locator("#error")).toContainText("Your username is invalid!");
});