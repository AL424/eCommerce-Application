# eCommerce-Application

## Description of the project

### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), which internally uses `Webpack` for bundling and `Jest` for testing.

API integration using [eCommerce](https://docs.commercetools.com/docs/) (authorization, currencies, languages, interactions with the shopping cart, presentation of the product catalog, detailed display of products and other configurations)

The project also uses: [TypeScript](https://www.typescriptlang.org/docs/), [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [Husky](https://typicode.github.io/husky/getting-started.html)

The application uses ready-made libraries such as:

[React Router DOM](https://github.com/remix-run/react-router#readme) for routing implementation, because it is a lightweight and fully-featured routing library.

[Redux Toolkit](https://redux-toolkit.js.org/) as a state manager, what lets us focus on the core logic of app, and do more work with less code.

[React-hook-form](https://www.react-hook-form.com/) is used to create registration and authentication forms, we chose it because it well supported.

[React-Slick](https://react-slick.neostack.com/) for sliders implementation, it's easy to use and have clear documentation.

[react-toastify](https://github.com/fkhadra/react-toastify#readme) to add notifications, which easy to set up for real.

## Installation
 Clone the Repository:
### ```git clone git@github.com:AL424/eCommerce-Application.git```
 Navigate to the Project Directory
### ```cd eCommerce-Application```
 Install Dependencies:
### ```npm install```
## Available Scripts

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run lint`

Runs ESLint to check the code for potential errors and code style issues in the src folder.

### `npm run lint-fix`

Runs ESLint with the --fix option to automatically fix some of the lint errors in the src folder.

### `npm run prettier`

Runs prettier automatic formatting of the code in the project.

### `npm prepare`

Installs Husky, a tool used to set up Git hooks, during the preparation step. This is useful for configuring Git hooks, such as pre-commit hooks, to run tasks like linting or tests before committing changes

## User Registration and Authentication
### Registration
To create an account and start using our platform, follow these steps:
#### 1. Visit the Registration Page:
Navigate to our website and locate the "Registration" button. Click on it to access the registration page.
#### 2. Provide Your Information:
Fill out the registration form with the required information.
#### 3. Complete Registration:
Once all fields are filled in correctly, you recieve success message and wil be redirected to the main page.

### Authentication
To log in and access your account, follow these steps:
#### 1. Visit the Login Page:
Go to our website and locate the "Login" button. Click on it to access the login page.
#### 2. Enter Credentials:
On the login page, enter your registered email address and password in the respective fields.
#### 3. Authenticate:
Click the 'Log In' button to authenticate. If your credentials are correct, you will receive a success message, be redirected to the main page, and gain access to your account.

## The application consists of eight functional pages and an error page.

### Home Page:
This page includes a slider with information about available promotional offers in the application and links to other pages.
### Catalog Page:
This page is designed to display all products available for purchase. Clicking on a product card takes the user to the product detail page. Users can filter products by price and sort them by price or name. Additionally, a search functionality is implemented, allowing users to search for products by keywords in descriptions and names.
### Product Page:
This page provides detailed descriptions of specific products. Users can manage the availability of the product in their cart, allowing them to add, remove, or change the quantity of items in the cart.
### Basket page:
This page displays the items added by the user in shopping cart, provides options for removing items, changing quantities, and shows the final order cost. Here users can apply promo codes for discounts and clear the cart.
### Registration Page:
This page allows users to register in the system. All form fields have mandatory validation to ensure correct information.
### Login Page:
This page is for authorized users to log in. These fields have validation to ensure the correctness of the entered data.
### Profile Page:
This page displays user information and allows users to edit this information. All fields undergo mandatory validation.
### About Us Page:
This page provides information about the development team, including each member's contribution to the project.
### 404 Page:
This page is displayed when an incorrect URL is entered.
## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
