import 'cypress-xpath';

class Hero {
    heroHeader = ()=> cy.xpath('//app-heroes //h2');
    newHeroInputLabel = ()=> cy.xpath('//app-heroes //label');
    newHeroInput = ()=> cy.xpath('//app-heroes //input');
    newHeroAddButton = ()=> cy.xpath('//app-heroes  //button [@class="add-button"]');
    listOfHeroes = ()=> cy.xpath('//app-heroes //ul');
    listOfHeroesNames = () => cy.xpath('//app-heroes //ul /li //a');
    listOfHeroesDeleteButton = ()=> cy.xpath('//app-heroes //ul /li //button');
    addInput = ()=> cy.xpath('//app-heroes//input');
    addButton = () => cy.xpath('//app-heroes//button[@class="add-button"]');

     addNewHeroes(testData) {
        if (!testData || !testData.addValidInputData) {
            throw new Error('Invalid test data provided');
        };
        const inputArray = testData.addValidInputData;
        
        for(let i=0; i< inputArray.length; i++) {{
            this.addInput().type(inputArray[i]);
            this.addButton().should('be.visible').click();      
        }
      }
    }
  
     addInvalidHeroes(testData) {
        if (!testData || !testData.addInvalidInputData) {
            throw new Error('Invalid test data provided');
        }
        const inputArray = testData.addInvalidInputData;
        
        for(let i=0; i< inputArray.length; i++) {{
            this.addInput().type(inputArray[i]);
            this.addButton().should('be.visible').click();      
        }
      }
    }

     deleteAllHeroesFromList() {
        this.listOfHeroesDeleteButton().each((button) => {
            cy.wrap(button).click();    
        })
      }   
    }

export const Heroes = new Hero();