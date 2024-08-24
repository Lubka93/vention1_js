import 'cypress-xpath';

class Dash {

dashboardHeader = () => cy.xpath('//app-dashboard //h2');
topHeroesWrapper = () => cy.xpath('//div[@class="heroes-menu"]');
topHeroes = ()=> cy.xpath('//div[@class="heroes-menu"]//a');
topHeroesXPath =  '//div[@class="heroes-menu"]//a';
inputName = () => cy.xpath('//div //label');
searchInput = () => cy.get('#search-box');
topDashboardHeros = () => cy.xpath('//div[@class="heroes-menu"]//a');

}

export const Dashboard = new Dash(); 