import { test, expect } from '@playwright/test';

test('Negative Username', async ({ page }) => {

  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await expect(page).toHaveURL(/practice-test-login/); //validation  ???
  await expect(page).toHaveTitle(/Practice Test Automation/);//validation

  await expect(page.getByLabel('password')).toBeVisible();//validation
  await expect(page.getByRole ("textbox", {name: "password"})).toBeVisible(); //validation
  await expect(page.getByRole ("textbox",{name:"password"})).toBeEnabled(); //validation
  
  await page.getByRole('textbox',{ name:'username'}).fill("student"); 
  await expect(page.getByRole ("textbox", {name: "username"})).toHaveValue("student");
  await page.getByRole("textbox", { name: "password" }).fill("Password155"); //Fill password       
  await expect(page.getByRole ("textbox", {name: "password"})).toHaveValue("Password155");          
  await page.getByRole('button', { name: 'Submit' }).click(); //Click submit

  await expect(page.getByText('Your password is invalid!').first()).toBeVisible();
  await expect(page.locator("#error")).toBeVisible();
  await expect(page.locator("#error")).toContainText("Your password is invalid!");

  await page.reload();
  await expect(page.locator('#error')).toBeVisible();
  await page.waitForTimeout(5000);
  await page.getByRole('textbox',{ name:'username'}).fill("student"); 
  await page.getByRole("textbox", { name: "password" }).fill(""); //Fill password                 
  await page.getByRole('button', { name: 'Submit' }).click(); //Click submit
  await expect(page.locator("#error")).toBeVisible();
  await expect(page.locator("#error")).toContainText("Your password is invalid!");
});