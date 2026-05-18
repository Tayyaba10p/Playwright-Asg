import { test, expect } from '@playwright/test';

test('Test Login', async ({ page }) => {

  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await expect(page).toHaveURL(/practicetestautomation\.com/); //validation  ???
  await expect(page).toHaveTitle(/Practice Test Automation/);//validation

  await expect(page.getByRole ("textbox", {name: "username"})).toBeVisible(); //validation
  await expect(page.getByRole ("textbox",{name:"username"})).toBeEnabled(); //validation
  await expect(page.getByLabel('Username')).toBeVisible();//validation
  await page.getByRole('textbox',{ name:'username'}).fill('student'); 

  await expect(page.getByRole ('textbox', {name:'password'})).toBeVisible(); //validation
  await expect(page.getByRole ("textbox",{name:"password"})).toBeEnabled(); //validation
  await expect(page.getByLabel('Password')).toBeVisible(); //validation
  await page.getByRole("textbox", { name: "password" }).fill("Password123");

  await expect(page.getByRole ('button',{name:'submit'})).toBeVisible(); //validation
  await expect (page.getByRole ('button',{name:'submit'})).toBeEnabled(); //validation
  await expect(page.getByRole ('button',{name:'submit'})).toHaveText("Submit") //validation                    
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/');
  await expect(page).toHaveTitle("Logged In Successfully | Practice Test Automation");//validation ??
  await expect(page.locator("h1")).toContainText("Logged In Successfully"); //validation
  await expect(page.getByText("Logged in successfully")).toBeVisible(); //validation

  await expect(page.getByRole('link',{ name: 'Log out' })).toBeVisible();
  await expect(page.getByRole('link',{name: 'Log out'})).toBeEnabled();
  await expect(page.getByRole('link', {name: 'log out'})).toHaveText("Log out")

});