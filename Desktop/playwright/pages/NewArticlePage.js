export class EditorPage {
    constructor(page) {
      this.page = page;
      this.createArticleButton =  page.getByRole('button', { name: 'Publish Article' });
      this.articleTitleInput =  page.getByPlaceholder('Article Title');
      this.articleAboutInput =  page.getByPlaceholder('What\'s this article about?');
      this.articleBodyInput =   page.getByPlaceholder('Write your article (in');
      this.articleTagsInput =   page.getByPlaceholder('Enter tags');
      this.randomStrings = [];

   
    }
  
    async goToLoginPage() {
      await this.createArticleButton.click();
    }

     generateRandomString(length) {
        return Math.random().toString(36).substring(2, 2 + length);
      }
      
    
    async fillArticleForm (title, about, body, tag) {

        if (title && about && body && tag) {  
        await this.articleTitleInput.fill(title);
        await this.articleAboutInput.fill(about);
        await this.articleBodyInput.fill(body);
        await this.articleTagsInput.fill(tag);
        await this.createArticleButton.click();

        } else  {
        
        const articleTitle = this.generateRandomString(7); 
        const articleAbout = this.generateRandomString(10); 
        const articleBody = this.generateRandomString(30); 
        const articleTags = this.generateRandomString(5); 
    
        this.randomStrings.push(articleTitle, articleAbout, articleBody, articleTags);
    
        await this.articleTitleInput.fill(articleTitle);
        await this.articleAboutInput.fill(articleAbout);
        await this.articleBodyInput.fill(articleBody);
        await this.articleTagsInput.fill(articleTags);
        
        await this.createArticleButton.click();
         }
    }
  
  }
  