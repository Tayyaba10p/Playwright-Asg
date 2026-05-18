import { test, expect } from '@playwright/test';

test('Negative Username', async ({ page }) => {

  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await expect(page).toHaveURL(/practice-test-login/); //validation  ???
  await expect(page).toHaveTitle(/Practice Test Automation/);//validation

  await expect(page.getByLabel('Username')).toBeVisible();//validation
  await expect(page.getByRole ("textbox", {name: "username"})).toBeVisible(); //validation
  await expect(page.getByRole ("textbox",{name:"username"})).toBeEnabled(); //validation
  
  await page.getByRole('textbox',{ name:'username'}).fill('student1234'); 
  await page.getByRole("textbox", { name: "password" }).fill("Password123"); //Fill password                 
  await page.getByRole('button', { name: 'Submit' }).click(); //Click submit

  await expect(page.getByText('Your username is invalid!')).toBeVisible();
  await expect(page.locator("#error")).toBeVisible();
  await expect(page.locator("#error")).toContainText("Your username is invalid!");

await page.reload();
// ; 
await expect(page.locator('#error')).toBeVisible();
await page.waitForTimeout(5000);
  await page.getByRole('textbox',{ name:'username'}).fill(''); 
  await page.getByRole("textbox", { name: "password" }).fill("Password123"); //Fill password                 
  await page.getByRole('button', { name: 'Submit' }).click(); //Click submit
  await expect(page.locator("#error")).toBeVisible();
  await expect(page.locator("#error")).toContainText("Your username is invalid!");
});