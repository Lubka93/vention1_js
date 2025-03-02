export class LoginPage {
    constructor(page) {
      this.page = page;
      this.emailInput = page.getByPlaceholder('Email');
      this.passwordInput = page.getByPlaceholder('Password');
      this.loginButton = page.locator('button:has-text("Sign in")')
    }
  
    async fillEmailInput() {  
      await this.emailInput.fill('foo@gmail.com');
    }
  
    async fillPasswordInput() {
      await this.passwordInput.fill('foo');
    }
  
    async clickOnLoginButton() {
      await this.loginButton.waitFor({ state: 'visible' });
      await this.loginButton.click();
    }
  }
  