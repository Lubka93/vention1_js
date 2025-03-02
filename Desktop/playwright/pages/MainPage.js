export class MainPage {
    constructor(page) {
      this.page = page;
     this.homePageUser = page.getByRole('link', { name: 'user image lsjdflsadf' });
     this.globalFeed =  page.getByText('Global Feed');
    }
  }
  