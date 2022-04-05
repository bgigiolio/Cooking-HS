# Team38's CookingHS

Heroku Deployed Link: https://cookinghs.herokuapp.com/


# Installation Requirements
* Node version: 16.13.1
* Run `yarn install` inside the "team38/cookinghs/" folder
* Run `yarn install` inside the "team38/cookinghs/client" folder

# Credentials
User Credentials
* username: user
* password: user

Admin Credentials
* username: admin
* password: admin

Of course, additional users can be made thorough the sign-up page.

The requests to make to the server to create an admin user:
* PATCH /api/users/:id 
* with query: {admin: true}

# Instructions on running app

## Running locally
* Make sure to follow the "Installation Requirements" to make sure everything is fully installed on your local computer
* Go into "team38/cookinghs/client/src/shared/basedUrl.js" and comment out line 3 or `export const baseUrl = "https://cookinghs.herokuapp.com/"` and uncomment line 1 or `// export const baseUrl = "http://localhost:5000/"`
* `yarn start` in "team38/cookinghs/" folder to set up the backend
* `yarn start` in "team38/cookinghs/client" folder for local web server

## Running via deployed link
* You can access the deployed website via the following link: https://cookinghs.herokuapp.com/

# Website Components

## The role of users
The core of the web application are the recipes. Users are able to search for recipes according
to name, cuisine, or even ingredients. These recipes include a list of ingredients with their
desired quantities, recipe calorie count, nutritional information of the dish, and a step-by-step
guide on how to make the dish. Users can share recipes and teach cooking methods
with friends and strangers alike, while newer cooks can follow along other users' recipes. Users can
also create “forks” of existing recipes to include improvements in ingredients, seasonings, or
even entire steps. Lastly, users are able to vote for the recipes that they think are best, as well
as leave feedback and comments.

## How to use the application & how the users would go about using all the features of your website

### Login
By clicking on `Login` in the navigation bar:
* The login page is for both users and admins to log into our website
* You can use the credentials from the 'Credentials' section to log into as a user or an admin, or sign up for a new user
* Logging into the website as a user will lead them to the recipes page
* Logging into the website as a admin will lead them to the admin page
* You can also sign up for a new account, and then log in with that account with those new credentials

### Landing
By clicking on `CookingHS` in the navigation bar:
* The landing page is the home page that will introduce everyone to our website with captivating visuals
* We have a button `Let's get Cooking` which leads you to the recipe page

### Recipes
By clicking on `Recipes` in the navigation bar:
* This page allows you to view all the recipes where each recipe card has a sneak-peek of all the details you can find when you click on that card.
* There is "+ Add a Recipe" button that allows you to add a new recipe. By cliking on the "+", you will have the option to add a new recipe by adding in a custom image, the recipe name, recipe description, nutritional or other details, ingredients, steps, and difficulty.
* If you click on a recipe (like "Original Mongolian Chicken" for example), it will send you to a page with similar details to what we can see when we want to add a recipe (i.e. recipe name, recipe description, nutritional or other details, ingredients, steps, and difficulty). We can also see the rating of the recipe in the form of stars. There are some actions that any user can do (even without being logged in) like the following:
  * Navigate to the user who created this recipe by clicking on their username
  * Change the servings for the recipe to adjust the ingredients needed
  *  Viewing the comments to the recipe (you can view more by clicking the "Load More Reviews" buttons) 
  *  Sort by "Date" or "Difficulty"
  *  Filter by "Course" (ex. Appetizer, Dessert, etc...), "Cuisine" (ex. Indian, Italian, etc...), Max Difficulty, Max CookTime, and by Ingredients
 * However, this page, also include several other actions that you can do only logged-in as a user:
   * You may fork the recipe. In other words, you can create a copy of the recipe and add your own spin to it. A timeline will be shown to demonstrate the fork history for users to view. This fork history is rendered as a list and you can see an example for the recipe "Slow Cooker Philadelphia Pulled Pork Roll".
   * You can report the recipe.
   * You can add a rating or review to the recipe.
   * You can report a comment.
   * You can bookmark the recipe.

### Users
By clicking on the profile button (circle) in the navigation bar:
* This page is meant for a user to view their own profile or the profile of another user
* Each user will have a set of recipes that they have made on their profile (they can edit or delete these recipes)
* Each user will also have a set of recipes they have bookmarked or liked for future reference
* The user can edit their own profile (they can update their profile picture, username, name, email, and password)
* Each user also has a functional progress bar that measures their skill level. Their progress is measured by the number of recipes they have made. The progress will fill {number of recipes made by user}/100 of the progress bar or will completely fill the progress bar if the number of recipes made by user is greater than or equal to 100. Here are the skill levels that could be assigned to a user:
  * Beginner: The number of recipes made by the user is between 0 and 10 inclusive
  * Intermediate: The number of recipes made by the user is between 11 and 30 inclusive
  * Advanced: The number of recipes made by the user is between 31 and 60 inclusive
  * Master Chef: The number of recipes made by the user is above 60

### Admin
By logging into the admin user through the `Login` in the navigation bar (you can only see `Admin` in the navigation bar when you're logged in as an admin user):
* Use the admin credentials in the "Credentials" section to access this page
* This page allows admin to manage and view all reports
* For each report, you can view further details on that report or resolve it 
* The further details section will have further routes to the specific users being referenced in the report, and the recipe being referenced as well

# Overview of the routes in your Express server
. is the baseURL which could be `https://cookinghs.herokuapp.com/` if using the deployed version or `http://localhost:3000/` if using the local version

* ./recipes
  * Description: View all the recipes 
  * Input: None
  * Return Value: Get all recipes
* ./recipes/:id
  * Description: Get the individual recipe page
  * Input: id
  * Return Value: Get a recipe based on "id"
* ./recipes/newrecipe
  * Description: Post a new recipe
  * Input: NewRecipe
  * Return Value: None
* ./api/users
  * Visit /routes/users.js for in depth descriptions of each user route and its usage
* ./admin
  * Description: Get all the reports in the admin dashboard page (admin dashboard mainly for managing reports)
  * Input: None
  * Return Value: Get all the reports
* ./admin:id
  * Description: Get a specific details page for a report from the admin page
  * Input: id
  * Return Value: Returns the specific details page for a report from the admin page based on "id"

# Third-Party Libraries
    "@emotion/react": "latest",
    "@emotion/styled": "latest",
    "@material-ui/core": "^4.12.3",
    "@material-ui/icons": "^4.11.2",
    "@mui/lab": "latest",
    "@mui/material": "latest",
    "@testing-library/jest-dom": "^5.14.1",
    "@testing-library/react": "^12.0.0",
    "@testing-library/user-event": "^13.2.1",
    "axios": "^0.26.1",
    "bootstrap": "^5.1.3",
    "crypto-js": "^4.1.1",
    "fractional": "^1.0.0",
    "material-ui-search-bar": "^1.0.0",
    "math": "^0.0.3",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-redux": "^7.2.6",
    "react-router-dom": "^6.2.1",
    "react-scripts": "5.0.0",
    "reactstrap": "^9.0.1",
    "redux": "^4.1.2",
    "redux-devtools-extension": "^2.13.9",
    "redux-thunk": "^2.4.1",
    "web-vitals": "^2.1.0"
    
    "cloudinary": "^1.29.0",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.17.3",
    "express-session": "^1.17.2",
    "mongodb": "^4.4.1",
    "mongoose": "^6.2.8"
