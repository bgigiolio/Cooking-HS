# Team38's CookingHS

how to use the application

the roles of users

how the users would go about using all the features of your website. 

overview of the routes in your Express server

what they are used for in your app

what data they expect to be sent

what they would return. 

instructions for how to run your app locally after cloning your repo

where to run npm install

commands to start the local web server and database (for example, using the commands we used in lecture)

which requests to make to the server to create an admin user 

(normal users can generally be made using the signup functionality of your app, but that should be in your instructions as well)

It should be clear to the grader how to setup your app locally.

# Installation Requirements
* Node version: 16.14.0
* Run `yarn install` inside the "team38/cookinghs/" folder
* Run `yarn install` inside the "team38/cookinghs/backend" folder

# Credentials
User Credentials
* username: user
* password: user

Admin Credentials
* username: admin
* password: admin

# Website Components

## Login
By clicking on `Login` in the navigation bar:
* The login page is for both users and admins to log into our website
* You can use the credenitals from the 'Credentials' section to log into as a user or an admin
* Logging into the website as a user will lead them to the recipes page
* Logging into the website as a admin will lead them to the admin page
* You can also sign up for a new account, and then log in with that account with those new credentials

## Landing
By clicking on `CookingHS` in the navigation bar:
* The landing page is the home page that will introduce everyone to our website with captivating visuals
* It has a search bar that currently leads you to the recipe page (Once we set up our backend, this will become functional)

## Recipes
By clicking on `Recipes` in the navigation bar:
* This page allows you to view all the recipes
* There is "+" button that allows you to add a new recipe. By cliking on the "+", you will the option to add a new recipe by adding in a custom image, the recipe name, nutritional or other details, ingredients, and steps. This will become functional when the backend is setup.
* If you click on a recipe (like "Original Mongolian Chicken" foor example), it will send you to a page with similar details to what we can see when we want to add a recipe. However, this page, also include several other options:
  * You may fork the recipe. In other words, you can create a copy of the recipe and add your own spin to it. A timeline will be shown to demonstrate the fork history for users to view. This fork history is rendered as a list and you can see an example for the recipe "Archer's Fried Chicken".
  * You can report the recipe.
  * You can add a rating or review to the recipe.
  * You can view comments to the recipe.
  * You can report a comment.
  * And finally, you can change the servings for the recipe to adjust the ingredients needed.
  * Many of these features will become fully functional once the backend is setup.

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
By logging into the admin user through the `Login` in the navigation bar:
* Use the admin credentials in the "Credentials" section to access this page
* This page allows admin to view all users, view all recipes, and manage reports
* You can also delete users or recipes (assuming the admin is a respsonsible individual)
* For each report, you can view further details on that report or delete it
