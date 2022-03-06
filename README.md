# Team38's CookingHS

# Installation Requirements
* Node version: 16.14.0
* Run `npm install --force` inside the "team38/cookinghs/" folder
* Run `npm start` inside the "team38/cookinghs/" folder

# Credentials
User Credentials
* username: user
* password: user

Admin Credentials
* username: admin
* password: admin

# Website Components

## Login
* The login page is for both users and admins to log into our website
* You can use the credenitals from the 'Credentials' section to log into as a user or an admin
* Logging into the website as a user will lead them to the recipes page
* Logging into the website as a admin will lead them to the admin page
* You can also sign up for a new account, and then log in with that account with those new credentials

## Landing
* The landing page is the home page that will introduce everyone to our website with captivating visuals
* It has a search bar that currently leads you to the recipe page (Once we set up our backend, this will become functional)

## Recipes

## Users
* This page is meant for a user to view their own profile or the profile of another user
* Each user will have a set of recipes that they have made on the user page
* Each user also has a functional progress bar that measures their skill level. Their progress is measured by the number of recipes they have made. The progress will fill {number of recipes made by user}/100 of the progress bar or will completely fill the progress bar if the number of recipes made by user is greater than or equal to 100. Here are the skill levels that could be assigned to a user:
  * Beginner: The number of recipes made by the user is between 0 and 10 inclusive
  * Intermediate: The number of recipes made by the user is between 11 and 30 inclusive
  * Advanced: The number of recipes made by the user is between 31 and 60 inclusive
  * Master Chef: The number of recipes made by the user is above 60
* Once the backend is setup, this page will be used to represent many different users 

## Admin
