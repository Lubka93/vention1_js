## E2E Cypress e2e tests for Option 1

#### Tests are written for webapp Tour Of Heroes

I prepared simple e2e tests which should cover all branches of webapp. I focused on main navigation paths based on documentaion on Angular webpage and my actual interaction with app. I also focused also on testing main functionality, where I covered positive and also negative test cases.



#### Cypress tests are written using JavaScript

#### Relevant utilities which I used for creating testing enviroment:

- Cypress version: 13.13
- Node version: 20.9.0
- npm version: 10.8.2 
- cypress xpath: 2.0.3
- vs studio code: 1.83.1
- git: 2.43.0.windows.1


#### Tour of Heroes
Web app Tour Od Heroes is running locally on localhost. In order to run it I used command **npm run start**
- it uses port 4200.


### Steps to Clone and Run e2e Tests

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/Lubka93/pantheon_option1.git
    ```

2. **Navigate to the Project Directory:**
    ```bash
    cd E2E_Cypress_Option1
    ```

3. **Install Dependencies:**
    ```bash
    npm install
    ```

4. **Run Cypress Tests:**
    - To open  the Cypress Test Runner:
        ```bash
        npm run open
        ```
    - To run all tests in headless mode:
        ```bash
        npm run runner
        ```
    - To run all tests in headed mode:
        ```bash
        npm run runnerH
        ```
