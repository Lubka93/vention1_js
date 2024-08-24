import { Base } from "../components/base";
import { Dashboard } from "../components/dashboard";
import { Heroes } from "../components/heroes";
import { DetailPage } from "../components/detailPage";
import 'cypress-xpath';

describe('Home page is correctly diplayed', ()=>{
    before(()=>{
        Base.clearAllStorageData(); 
        cy.title('Tour of Heroes');
    })
    beforeEach(()=>{
        cy.visit(Cypress.env('baseURL'));
    })

    it('Common page header is correctly displayed', ()=>{

    //Assertions for common page header UI
    cy.url().should('contain', '/dashboard');
    Base.header().should.exist;
    Base.header().invoke('text').should('eql', 'Tour of Heroes');
    Base.dashboard().should.exist;
    Base.dashboard().invoke('text').should('eql', 'Dashboard');
    Base.heroes().should.exist;
    Base.heroes().invoke('text').should('eql', 'Heroes');
    })
    })

describe('Main navigation has correct navigation functionality and subpages are displayed correctly', ()=>{
    before(()=>{
        cy.title('Tour of Heroes');
        Base.clearAllStorageData();
    })
   
        beforeEach(()=>{
            cy.visit(Cypress.env('baseURL')); 
        })
    

    it('Heroes subpage is opened and correctly displayed after clicking on heroes navigation button', ()=>{
           Base.clickOnHeroes();
            
            cy.url().should('contains', '/heroes');

            //Assertions for Heroes UI
            Heroes.heroHeader().should('have.text', 'My Heroes');
            Heroes.newHeroInput().should('be.visible');
            Heroes.newHeroInputLabel().should('contain', 'Hero name:');
            Heroes.newHeroAddButton().should('be.visible').should('contain', 'Add hero');
            Heroes.listOfHeroes().should('be.visible');

            //Assertion for messages block
            Base.messageHeader().should('be.visible').invoke('text').then(text=>{
                expect(text).to.eql('Messages')});
    
            cy.xpath(Base.clearMessagesButton).should('be.visible').should('have.text', 'Clear messages');
        })
    
    it('Dashboard subpage is opened and correctly displayed after clicking on dashboard navigation button', ()=>{
        
            Base.clickOnDashBoard();

            cy.url().should('contain', '/dashboard');

            //Assertions for Dashboard UI
            cy.url().should('contain', '/dashboard');
            Dashboard.dashboardHeader().should('be.visible');
            Dashboard.dashboardHeader().invoke('text').should('contain', 'Top Heroes');
    
           
            //Assertion for top 4 heroes
            cy.fixture('testData.json').then((testData)=>{
                const nameArray = testData.topHeroesDataSet;
            Dashboard.topDashboardHeros().should('have.length', nameArray.length) 
              .each((element, index) => {
                cy.wrap(element).invoke('text').should('contain', nameArray[index]);
              });
            })

            //Assertion for search functionality
             Dashboard.inputName().should('have.text', 'Hero Search');
             Dashboard.searchInput().should('be.visible');
    
            //Assertion for messages block
            Base.messageHeader().should('be.visible').invoke('text').then(text=>{
                expect(text).to.eql('Messages');
            })
            cy.xpath(Base.clearMessagesButton).should('be.visible').should('have.text', 'Clear messages');
        })
    })

describe('Verify functionality for dashboard subpage', ()=>{
        before(()=>{
            cy.title('Tour of Heroes');
            Base.clearAllStorageData(); 
        })
        beforeEach(()=>{
            cy.visit(Cypress.env('baseURL'));
            Base.clickOnDashBoard();
            cy.url().should('contain', '/dashboard');
        })

    it('Verify correct prelink from top heroes on dashboard subpage to its detail page', () => {

            // Find all hero links using XPath
            cy.xpath(Dashboard.topHeroesXPath).then((heroes) => {
             
                const numHeroes = heroes.length;
                
                for (let i = 0; i < numHeroes; i++) {

                    //Verify that correct top hero was clicked
                    cy.fixture('testData.json').then((testData)=>{
                        const nameArray = testData.topHeroesDataSet;
                    
                        cy.xpath(Dashboard.topHeroesXPath).eq(i).invoke('text').then((text) => {
                            let heroName = text.trim(); 
                            let expectedName = nameArray[i].trim(); 

                            expect(heroName).to.equal(expectedName);
                       

                    //Click on top hero     
                    cy.xpath(Dashboard.topHeroesXPath).eq(i).should('be.visible').click();
                    cy.url().should('contain', '/detail');
                
                //Detail page contains correct UI components
                 DetailPage.heroDetailName().invoke('text').then((detailPageText) => {
                expect(detailPageText.trim().toLocaleLowerCase()).to.eql(`${heroName.toLocaleLowerCase()} details`)});

                 DetailPage.saveButton().should('be.visible');
                 DetailPage.saveButton().invoke('text').should('contain', 'save');

            //Assertion for message heading
            Base.messageHeader().should('be.visible').invoke('text').then(text=>{
                expect(text).to.eql('Messages');
            });
    
            //Assertion for clear button
            cy.xpath(Base.clearMessagesButton).should('be.visible').should('have.text', 'Clear messages');

            //Assertion for messages block
            Base.messageBlock().should('exist');
            })
        })

                    // Go back to the dashboard subpage
                    DetailPage.goBack();

                    // to re-find the hero links after navigating back
                    cy.xpath(Dashboard.topHeroesXPath);
                }
            })
        })


    it.only('Verify clear messages button functionality at the dashboard subpage', () => {
          
            // messages are displayed
            cy.contains('div', 'HeroService: fetched heroes').should('exist');
        
            // clear the messages 
            Base.clearAllMessages();
        
            // confirm that messages are deleted
            cy.contains('div', 'HeroService: fetched heroes').should('not.exist');
    
            cy.reload();
        
            // Verify that the messages are displayed again after reload
            cy.contains('div', 'HeroService: fetched heroes').should('exist');
        });

    it('Verify hero update functionality from dashboard subpage', ()=>{

            cy.xpath(Dashboard.topHeroesXPath).first().then((firstHero) => {
              
                cy.wrap(firstHero).invoke('text').then((name) => {
            
                    // Click on the first hero to navigate to the detail page
                    cy.wrap(firstHero).click();
            
                    // Verify that the URL contains 'detail'
                    cy.url().should('contain', '/detail');
            
                    // Update the input field with the new name
                    DetailPage.updateInput().clear().type(`${name.trim()} Test`);

                    DetailPage.saveButton().click();

                  //  Assertion of the update   
                  cy.url().should('contain', '/dashboard');    
                  cy.xpath(Dashboard.topHeroesXPath).first().should('contain', `${name.trim()} Test`);
                })
            })
        })
    })


describe('Verify search functionality for dashboard page', ()=>{
        before(()=>{
            cy.title('Tour of Heroes');
            Base.clearAllStorageData(); 
        })
        beforeEach(()=>{
            cy.visit(Cypress.env('baseURL'));
            cy.fixture('testData.json').as('testData');
            cy.url().should('contain', '/dashboard');
        })
               
    it('Verify search functionality on dashboard subpage for valid input', ()=>{
        cy.get('@testData').then((testData)=>{
        const nameArray = testData.searchValidInputData;
            
        for (let i= 0; i < nameArray.length; i++) { 
        Dashboard.searchInput().should('be.visible').type(nameArray[i]);
   
        // Verify the search results
        cy.xpath('//app-hero-search//li').each((el) => {
        const resultText = el.text().trim().toLowerCase();
        expect(resultText).to.contain(nameArray[i].trim().toLowerCase())});

        cy.wait(500);
        Dashboard.searchInput().clear();
        cy.wait(500);
             }
         })
    })

    it('Verify search functionality on dashboard subpage for invalid input', ()=>{
    
        cy.get('@testData').then((testData)=>{
        const nameArray = testData.searchInvalidInputData;

        for (let i= 0; i < nameArray.length; i++) { 
        Dashboard.searchInput().should('be.visible').type(nameArray[i]);
        cy.wait(500);

        //Verify that no reasults were found
        cy.xpath('//app-hero-search//ul').children().should('have.length', 0);

        Dashboard.searchInput().clear();
        cy.wait(500);
                    }
                })
            })
        })

describe('Verify functionality for heroes subpage', ()=>{

    before(()=>{
        cy.title('Tour of Heroes');
        Base.clearAllStorageData(); 
    })
    beforeEach(()=>{
        cy.visit(Cypress.env('baseURL'));
        Base.clickOnHeroes();
        cy.url().should('contain', '/heroes');
        cy.fixture('testData.json').as('testData');
    })

    it('Verify add functionality of heroes subpage with valid data', () => {
        
        cy.get('@testData').then((testData) => {
            Heroes.addNewHeroes(testData);
        });
    
        // Validate that heroes were added to the list
        cy.get('@testData').then((testData) => {
            const addedHeroes = testData.addValidInputData;

            addedHeroes.forEach((heroName) => {
                Heroes.listOfHeroesNames().should('contain.text', heroName);
            })
        })
    })

    it('Verify add functionality of heroes subpage', () => {
        
        cy.get('@testData').then((testData) => {
            Heroes.addInvalidHeroes(testData);
        });
    
        // Validate that heroes were not added to the list
        cy.get('@testData').then((testData) => {
            const notAddedHeroes = testData.addInvalidInputData;
            
            notAddedHeroes.forEach((heroName) => {
                Heroes.listOfHeroesNames().should('not.contain', heroName);
            })
        })
    })

    it('Delete all item on heroes list at heroes subpage', ()=>{

        Heroes.deleteAllHeroesFromList();

        //Assertions
        Heroes.listOfHeroes().children().should('have.length', 0);
    });

    it.only('Verify clear messages button functionality at the heroes subpage', () => {
          
        // Verify that there are initial messages displayed
        cy.contains('div', 'HeroService: fetched heroes').should('exist');
    
        Base.clearAllMessages();
      
        // Assert that the messages have been deleted
        cy.contains('div', 'HeroService: fetched heroes').should('not.exist');
          cy.wait(500)
        cy.reload();
      

        // Verify that the messages are displayed again after reload
        cy.contains('div', 'HeroService: fetched heroes').should('be.visible').should('exist');
    });


    it('Verify hero update functionality from heroes subpage', ()=>{

        Heroes.listOfHeroesNames().first().click();
        cy.url().should('contain', '/detail');
      
         DetailPage.updateInput().clear().type('Test1');

         DetailPage.saveButton().click();
         cy.url().should('contain', '/heroes');

         Heroes.listOfHeroesNames().first().should('contain.text', 'Test1');
    })
})