
import { test, expect } from '../fixtures';  
import { NavPage } from '../pages/NavPage.js';
import { EditorPage } from '../pages/NewArticlePage';
import { MainPage } from '../pages/MainPage'; 


test('Verify - Go to new article page path', async ({ homePage }) => {
const navPage = new NavPage(homePage);
const editorPage = new EditorPage(homePage);
const mainPage = new MainPage(homePage);

await expect(mainPage.homePageUser).toBeVisible();
await expect(homePage.url()).toBe('https://angular-realworld-example-app-neon.vercel.app/');

await  navPage.goToArticlePage();

await expect(editorPage.createArticleButton).toBeVisible();
await expect(homePage.url()).toBe('https://angular-realworld-example-app-neon.vercel.app/editor');

});

test('Verify the creation of a new article', async ({ homePage }) => {
   const editorPage = new EditorPage(homePage);
   const mainPage = new MainPage(homePage);

   await expect(mainPage.homePageUser).toBeVisible();  //If I delete this ...it will fail and i wont be able to load /editor page ... why?? timing??

   await homePage.goto(`${process.env.BASE_URL}/editor`);
   await expect(editorPage.createArticleButton).toBeVisible();
   await expect(homePage.url()).toBe('https://angular-realworld-example-app-neon.vercel.app/editor');

   await editorPage.fillArticleForm();

   //Assertions for new creted article
   await expect(homePage.locator('h1')).toHaveText(`${editorPage.randomStrings[0]}`);
   await expect(homePage.url()).toBe(`https://angular-realworld-example-app-neon.vercel.app/article/${editorPage.randomStrings[0]}`);
   
 //Assertions that the new articvle is added to the list of articles on the main page
   await homePage.goto(`${process.env.BASE_URL}/`);
   await expect(mainPage.globalFeed).toBeVisible();
   await mainPage.globalFeed.click();
   await expect(homePage.getByRole('link', { name: `${editorPage.randomStrings[0]} ${editorPage.randomStrings[1]} Read more` })).toBeVisible();

    editorPage.randomStrings = [];


   });

   
test('Verify the creation of 5 new articles', async ({ homePage }) => {
   const editorPage = new EditorPage(homePage);
   const mainPage = new MainPage(homePage);
   const numOfArticles = 5;

   await expect(mainPage.homePageUser).toBeVisible();  //If I delete this ...it will fail and i wont be able to load /editor page ... why?? timing??

for (let i =0; i<numOfArticles; i++) {

   await homePage.goto(`${process.env.BASE_URL}/editor`);
   await expect(editorPage.createArticleButton).toBeVisible();
   await expect(homePage.url()).toBe('https://angular-realworld-example-app-neon.vercel.app/editor');

   await editorPage.fillArticleForm();

   //Assertions for new creted article
   await expect(homePage.locator('h1')).toHaveText(`${editorPage.randomStrings[0]}`);
   await expect(homePage.url()).toBe(`https://angular-realworld-example-app-neon.vercel.app/article/${editorPage.randomStrings[0]}`);
   
 //Assertions that the new articvle is added to the list of articles on the main page
   await homePage.goto(`${process.env.BASE_URL}/`);
   await expect(mainPage.globalFeed).toBeVisible();
   await mainPage.globalFeed.click();
   await expect(homePage.getByRole('link', { name: `${editorPage.randomStrings[0]} ${editorPage.randomStrings[1]} Read more` })).toBeVisible();
   console.log(`Number of added articles is ${i}`);

   editorPage.randomStrings = [];
}
   
   });

   test('Verify that new article is not added when no input is filled', async ({ homePage }) => {
      const editorPage = new EditorPage(homePage);
      const mainPage = new MainPage(homePage);
   
      await expect(mainPage.homePageUser).toBeVisible();  //If I delete this ...it will fail and i wont be able to load /editor page ... why?? timing??
   
      await homePage.goto(`${process.env.BASE_URL}/editor`);
      await expect(editorPage.createArticleButton).toBeVisible();
      await expect(homePage.url()).toBe('https://angular-realworld-example-app-neon.vercel.app/editor');
   
      await editorPage.createArticleButton.click();
   
      //Assertions for staying at the aditor page - negative scenario
      await expect(editorPage.createArticleButton).toBeVisible();
      await expect(homePage.url()).toBe('https://angular-realworld-example-app-neon.vercel.app/editor');
      
      });

      test('Verify that new article is not added when the same string is added to all form inputs', async ({ homePage }) => {
         const editorPage = new EditorPage(homePage);
         const mainPage = new MainPage(homePage);
      
         await expect(mainPage.homePageUser).toBeVisible();  //If I delete this ...it will fail and i wont be able to load /editor page ... why?? timing??
      
         await homePage.goto(`${process.env.BASE_URL}/editor`);
         await expect(editorPage.createArticleButton).toBeVisible();
         await expect(homePage.url()).toBe('https://angular-realworld-example-app-neon.vercel.app/editor');
      
         await editorPage.fillArticleForm('test', 'test', 'test', 'test');
      
         //Assertions for staying at the editor page - negative scenario
         await expect(editorPage.createArticleButton).toBeVisible();
         await expect(homePage.url()).toBe('https://angular-realworld-example-app-neon.vercel.app/editor');
         
         });
   
      
   
   
