// Task: Online Book Library Management System
// Create a class-based system to manage an online book library with async operations

class Book {
    constructor(id, title, author, available = true) {
      this.id = id;
      this.title = title;
      this.author = author;
      this.available = available;
    }
  }


  
  /*
  Task 1: Complete the Library class implementation
  - Add methods for adding books, borrowing books, and returning books
  - Use proper error handling with try-catch
  - Implement async operations with Promises or async/await
  - Use array methods where appropriate
  */
  
  class Library {
    #books = [];  // Private field
    #nextId = 1;
 
    async getBooks() {
      return this.#books;
  }

  async getBorrowedBooks() {
    const updatedBooks = await this.getBooks();
    const borrowedBooks = updatedBooks.filter(book => !book.available);

    if (borrowedBooks.length > 0) {
        console.log("These books are currently borrowed:");
        borrowedBooks.forEach(book => {
            console.log(`* ${book.title} by ${book.author}`);
        });
    } else {
        console.log('No book is currently borrowed!');
    }
    return borrowedBooks;
}


    
    // TODO: Implement addBook method
    // Should validate that book has all required properties
    // Return a Promise that resolves with the added book

  addBook(bookData) {
        return new Promise((resolve, reject) => {
          try {
          if (bookData.title && bookData.author && bookData.available !== null && bookData.available !== undefined)           
        {
              const newBook = new Book(this.#nextId, bookData.title, bookData.author, bookData.available);
              this.#books.push(newBook);
              this.#nextId++;
              resolve(newBook);
            } else {
              const check = Object.entries(newBook)
                .filter(([key, value]) =>  value === null || value === "" || value === undefined)
                .map(([key]) => key);
                reject(`Missing book data: ${check}`); 
            }
          } catch (error) {
            console.log(`Error: ${error}`);
            reject(error); 
          }
        });
      }
      
   
    // TODO: Implement borrowBook method
    // Should be async and return a Promise
    // Throw error if book is not available
    // Update book's available status

    async borrowBook(bookId) {
        try {

            const foundBook = this.#books.find(book => book.id === bookId);
    
            if (!foundBook) {
                throw new Error("Book is not registered in the system!");
            }
    
           else  if (!foundBook.available) {
                throw new Error("Sorry, the book is already borrowed!");
            }
            else {
                foundBook.available = false;
            }
    
        } catch (error) {
            console.error("Error:", error.message);
            throw error;
        }
    }
    
    
    // TODO: Implement returnBook method
    // Should be async and return a Promise
    // Throw error if book wasn't borrowed

  async  returnBook(bookId) {
        try {
            const foundBook = this.#books.find(book => book.id === bookId);
    
            if (!foundBook) {
                throw new Error("Book is not registered in the system!");
            }
    
           else  if (foundBook.available) {
                throw new Error("Sorry, the book was not borrowed!");
            }
            else {
                foundBook.available = true;
               console.log(`Book ${foundBook.title} by ${foundBook.author} was successfully returned!`);
            }
     
        } catch (error) {
            console.error("Error:", error.message);
            throw error; 
        }
    }
    
    // TODO: Implement searchBooks method
    // Should accept search term and return filtered array of books
    // Use array methods (filter, map, etc.)

    async searchBooks(searchTerm) {
      try {
      
          const foundTitle = this.#books.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()));
          const foundAuthor = this.#books.filter(book => book.author.toLowerCase().includes(searchTerm.toLowerCase()));
  
          const allMatches = [...foundTitle, ...foundAuthor];
          const uniqueMatches = Array.from(new Set(allMatches.map(book => book.id)))
                                    .map(id => allMatches.find(book => book.id === id));
  
          if (uniqueMatches.length > 0) {
              console.log(`Here is the list of books that match search criteria:`);
              console.log(uniqueMatches); 
          } else {
              console.log('There are no matching search results!');
          }
  
          return uniqueMatches;
  
      } catch (error) {
          console.error("There was an error during searching process:", error.message);
          throw error;
      }
  }
  
  }
  
  const initializeLibrary = async (library, booksData) => {
    try {
        for (const book of booksData) {
            await library.addBook(book);
        }  

    } catch (error) {
        console.error('There is an error when initializing library:', error);
    }
};


  
  // TODO: Implement function to borrow multiple books
  const borrowMultipleBooks = async (library, bookIds) => {
    try {
      for (const bookId of bookIds) {
          await library.borrowBook(bookId);
      } 
  } catch (error) {
      console.error('There is an error during borrowing process:', error);
  }
  };
  
  /*
  Task 3: Write test code that demonstrates the usage of your implementation
  - Create a library instance
  - Add books
  - Perform searches
  - Borrow and return books
  - Handle errors
  - Use different types of loops (for, do...while)
  - Use switch statement for different operations
  */

// I can add here as many books as I want :)
const booksData = [
    { title: 'Harry Potter and Deatly Hallows', author: 'J. K. Rowling', available: true },
    { title: 'The Lord of the Rings', author: 'J.R. R. Tolkien', available: true },
    { title: 'Witcher', author: 'Andrzej Sapkowski', available: true },
    { title: 'Harry Potter and philosopher stone', author: 'J. K. Rowling', available: true },
    { title: 'Harry Potter and prisoner of Azkaban', author: 'J. K. Rowling', available: true }
];

// Here I can add ids of the books which I want to borrow
const bookIds = [
1,2,3
];

  
  // Example test code structure:
  const runLibraryTest = async () => {
    try {
      const library = new Library();
      
      await initializeLibrary(library, booksData);   // Here I am adding the books
      console.log("Theese books have been added to the library!");
      const getBooks = await library.getBooks();
      console.log(getBooks);
    
      await library.searchBooks('8888');  // Here I get no result because there is no matching result in the library

      await borrowMultipleBooks(library, bookIds);   //Here I am borrowing multiple books

    await library.returnBook(1);   //when I uncomment this books with specific number will be returned
   // await library.returnBook(2);   //when I uncomment this books with specific number will be returned

   await library.getBorrowedBooks();     //Here I list of all books which are right now borrowed

   const searchChoice = ['title', 'author']; 
   let title = 'Harry';
   let author = 'Sapkowski';

    for (let choice of searchChoice) {
      switch (choice) {
        case 'title':
          console.log(`Searching for books with the title ${title}...`);
          await library.searchBooks(title);  // Searching for matching title
          break;
        case 'author':
          console.log(`Searching for books by ${author}...`);
          await library.searchBooks(author);     // Searching for matching author
          break;
      }  }
      
    } catch (error) {
      console.error('Test failed:', error.message);
    }
  };
  
  // TODO: Run the test
  runLibraryTest();


