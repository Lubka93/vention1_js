export class NavPage {
  constructor(page) {
    this.page = page;
    this.signInButton =  page.locator('a[href="/login"]');
    this.goToArticlePageButton = page.locator('a[href="/editor"]'); 
  }

  async goToLoginPage() {
    await this.signInButton.click();
  }

  async goToArticlePage() {
    await this.goToArticlePageButton.click();
  }
}
