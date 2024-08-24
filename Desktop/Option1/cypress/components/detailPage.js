import 'cypress-xpath';

class Detail {
    
heroDetailName = ()=> cy.xpath('//app-hero-detail//h2');
goBackButton = ()=>cy.xpath('//app-hero-detail//button [text()="go back"]');
saveButton = ()=>cy.xpath('//app-hero-detail//button [text()="save"]');
updateInput = ()=> cy.xpath('//app-hero-detail //input');

goBack() {
    this.goBackButton().should('be.visible').click();
}

}

export const DetailPage = new Detail();