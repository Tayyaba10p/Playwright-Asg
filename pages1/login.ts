import { Page, Locator } from '@playwright/test'
export default 
class LoginPage {
    readonly loginField: Locator;
    readonly passwordfield: Locator;
    readonly LoginButton: Locator;
    constructor(page: Page) {
        this.loginField = page.getByRole('textbox', { name: 'Username' });
        this.passwordfield = page.getByRole('textbox', { name: 'Password' });
        this.LoginButton = page.getByRole('button', { name: 'Submit' });
    }
    async enterusername(username: string) {
        await this.loginField.fill(username);
    }
    async enterpassword(password: string) {
        await this.passwordfield.fill(password);
    }
    async clickloginbutton() {
        await this.LoginButton.click();
    }
}

