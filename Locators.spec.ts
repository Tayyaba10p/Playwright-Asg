import { test, expect } from '@playwright/test';

test.describe('Login page', () => {
  test('allow users to log in with valid credentials', async ({ page }) => {
    
    await page.goto('https://practicetestautomation.com/practice-test-login/');

    //Select usersname
    await expect(page.getByRole ("textbox", {name: "username"})).toBeVisible(); //validation
    await page.getByRole('textbox',{ name:'username'}).fill('student');

    //Select password
    await expect(page.getByRole ("textbox", {name: "password"})).toBeVisible(); //validation
    await page.getByRole('textbox', {name: 'password'}).fill('1234');

    //select button
    await page.getByRole('button', { name: 'Submit' }).click();

  });
  });
 
 