import 'cypress-xpath';



class Main {

  header = () => cy.xpath('//h1');
  dashboard = () => cy.xpath('//nav //a[1]');
  heroes = () => cy.xpath('//nav //a[2]');
  messageHeader = () => cy.xpath('//h2[text()="Messages"]');
  messageBlock = () => cy.xpath('//app-messages/div');
  clearMessagesButton = '//button[@class="clear"]';

  clearAllMessages() {
    cy.xpath(this.clearMessagesButton)
      .should('be.visible')
      .should('be.enabled')
      .click();
  }

  clearAllStorageData() {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
  }

  clickOnDashBoard() {
    this.dashboard().should('be.visible').click();
  }

  clickOnHeroes() {
    this.heroes().should('be.visible').click();
  }
}

export const Base = new Main();
