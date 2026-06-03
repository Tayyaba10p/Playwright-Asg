
import { test, expect, Page } from '@playwright/test';
import { BASE_URL } from '../Fixtures/urlConstants';
import loginData from '../TestData/loginData.json';


loginData.forEach((data: any) => {

  test(`Login test - ${data.username}`, async ({ page }) => {

    await navigateToLoginPage(page);

    await fillLOginForm(page, data.username, data.password);

    await clickSubmitButton(page);

    await validateLoginSuccess(page);

  });
});

//Login Function
async function navigateToLoginPage(page: Page) {
await page.goto(`${BASE_URL}/practice-test-login/`);
  }

//Function-Fill login page form
async function fillLOginForm(page: Page, username: string, password: string) {
  await page.getByRole('textbox', {name: 'Username'}).click();
  await page.getByRole('textbox', {name: 'Username'}).fill(username);  //hover =ctrl & clcik It will naviagte u to that fiel.
  await page.getByRole('textbox', {name: 'Password'}).click();
  await page.getByRole('textbox', {name: 'Password'}).fill(password);
}

//Function-Click submit button
async function clickSubmitButton(page: Page) {
  await page.getByRole('button', { name: 'Submit' }).click();
}

//Function-Validate login success
async function validateLoginSuccess(page: Page) {
  await expect(page.getByRole('heading', { name: 'Logged In Successfully' })).toBeVisible()
  await expect(page.getByRole('strong')).toContainText('Congratulations student. You successfully logged in!');
}