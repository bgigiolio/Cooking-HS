# Team38's CookingHS

how to use the application

the roles of users

how the users would go about using all the features of your website. 


overview of the routes in your Express server

what they are used for in your app

what data they expect to be sent

what they would return. 

instructions for how to run your app locally after cloning your repo


# Installation Requirements
* Node version: 16.14.0
* Run `yarn install` inside the "team38/cookinghs/" folder (TODO: may need to update this)
* Run `yarn install` inside the "team38/cookinghs/backend" folder (TODO: may need to update this)

# Credentials
User Credentials
* username: user
* password: user

Admin Credentials
* username: admin
* password: admin

Of course, additional users can be made thorough the sign-up page.

(TODO) which requests to make to the server to create an admin user 

# Important Commands
* `yarn start` for local web server
* `node server.js` for database

# Website Components (How to use the application)

## Login
By clicking on `Login` in the navigation bar:
* The login page is for both users and admins to log into our website
* You can use the credentials from the 'Credentials' section to log into as a user or an admin, or sign up for a new user
* (TODO) which requests to make to the server to create an admin user 
* Logging into the website as a user will lead them to the recipes page
* Logging into the website as a admin will lead them to the admin page
* You can also sign up for a new account, and then log in with that account with those new credentials

## Landing
By clicking on `CookingHS` in the navigation bar:
* The landing page is the home page that will introduce everyone to our website with captivating visuals
* We have a button `Let's get Cooking` which leads you to the recipe page

## Recipes
By clicking on `Recipes` in the navigation bar:
* This page allows you to view all the recipes where each recipe card has a sneak-peek of all the details you can find when you click on that card.
* There is "+ Add a Recipe" button that allows you to add a new recipe. By cliking on the "+", you will have the option to add a new recipe by adding in a custom image, the recipe name, recipe description, nutritional or other details, ingredients, steps, and difficulty.
* If you click on a recipe (like "Original Mongolian Chicken" for example), it will send you to a page with similar details to what we can see when we want to add a recipe (i.e. recipe name, recipe description, nutritional or other details, ingredients, steps, and difficulty). We can also see the rating of the recipe in the form of stars. There are some actions that any user can do (even without being logged in) like navigating to the user who created this recipe by clicking on their username, changing the servings for the recipe to adjust the ingredients needed, and viewing the comments to the recipe (you can view more by clicking the "Load More Reviews" buttons) However, this page, also include several other actions that you can do only logged-in as a user:
  * You may fork the recipe. In other words, you can create a copy of the recipe and add your own spin to it. A timeline will be shown to demonstrate the fork history for users to view. This fork history is rendered as a list and you can see an example for the recipe "Slow Cooker Philadelphia Pulled Pork Roll".
  * You can report the recipe.
  * You can add a rating or review to the recipe.
  * You can report a comment.
  * You can bookmark the recipe.

## Users
By clicking on `Users` in the navigation bar:
* This page is meant for a user to view their own profile or the profile of another user
* Each user will have a set of recipes that they have made on the user page
* The user also has the option to delete any of the recipes they have made
* Each user also has a functional progress bar that measures their skill level. Their progress is measured by the number of recipes they have made. The progress will fill {number of recipes made by user}/100 of the progress bar or will completely fill the progress bar if the number of recipes made by user is greater than or equal to 100. Here are the skill levels that could be assigned to a user:
  * Beginner: The number of recipes made by the user is between 0 and 10 inclusive
  * Intermediate: The number of recipes made by the user is between 11 and 30 inclusive
  * Advanced: The number of recipes made by the user is between 31 and 60 inclusive
  * Master Chef: The number of recipes made by the user is above 60
* Once the backend is setup, this page will be used to represent many different users 

## Admin
By logging into the admin user through the `Login` in the navigation bar (you can only see `Admin` in the navigation bar when you're logged in as an admin user):
* Use the admin credentials in the "Credentials" section to access this page
* This page allows admin to view all users, view all recipes, and manage reports
* You can also delete users or recipes (assuming the admin is a respsonsible individual)
* For each report, you can view further details on that report or delete it

# The role of users
The core of the web application are the recipes. Users are able to search for recipes according
to name, cuisine, or even ingredients. These recipes include a list of ingredients with their
desired quantities, recipe calorie count, nutritional information of the dish, and a step-by-step
guide on how to make the dish. Advanced cooks can share recipes and teach cooking methods
with friends and strangers alike, while newer cooks can follow along their recipes while learning
how to perform basic cooking tasks such as mincing garlic and chopping vegetables. Cooks can
also create “forks” of existing recipes to include improvements in ingredients, seasonings, or
even entire steps. Lastly, users are able to vote for the recipes that they think are best, as well
as leave feedback and comments.

# How the users would go about using all the features of your website
