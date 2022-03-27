import * as ActionTypes from './recipe-types';
import { baseUrl } from '../../shared/baseUrl';

export const getRecipes = () => (dispatch) => {
    dispatch(recipesLoading(true));
    return fetch(baseUrl + 'api/recipes')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        var errmess = new Error(error.message);
        throw errmess;
    }).then(response => response.json())
    .then(recipes => dispatch(addRecipes(recipes)))
    .catch(error => dispatch(failRecipes(error.message)))
}

export const recipesLoading = () => ({
    type: ActionTypes.RECIPES_LOADING
});

export const addRecipes = (recipes) => ({
  type: ActionTypes.ADD_RECIPES,
  payload: recipes
});

export const failRecipes = (errmess) => ({
    type: ActionTypes.RECIPES_FAILED,
    payload: errmess
});

export const addRecipe = (recipe) => ({
  type: ActionTypes.ADD_RECIPE,
  payload: recipe
});

export const postRecipe = (author, parent, title, description, ingredients, steps, difficulty, course, cuisine, preptime, cooktime, servings, image) => (dispatch) => {
  const newRecipe = {
    author: author,
    parent: parent,
    title: title,
    description: description,
    ingredients: ingredients,
    steps: steps,
    difficulty: difficulty,
    course: course,
    cuisine: cuisine,
    preptime: preptime,
    cooktime: cooktime,
    servings: servings,
    image: image,
    averageRating: 0,
    comments: []
  };

  return fetch(baseUrl + 'api/recipes', {
    method: "POST",
    body: JSON.stringify(newRecipe),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => dispatch(addRecipe(response)))
  .catch(error => { console.log('recipe creation', error.message); alert('Recipe could not be posted\nError: '+error.message); });
}

export const editRecipe = (_id, author, parent, title, description, ingredients, steps, difficulty, course, cuisine, preptime, cooktime, servings, image) => (dispatch) => {
  const newRecipe = {
    _id: _id,
    author: author,
    parent: parent,
    title: title,
    description: description,
    ingredients: ingredients,
    steps: steps,
    difficulty: difficulty,
    course: course,
    cuisine: cuisine,
    preptime: preptime,
    cooktime: cooktime,
    servings: servings,
    image: image,
    averageRating: 0,
    comments: []
  };

  return fetch(baseUrl + 'api/recipes/' + _id, {
    method: "PUT",
    body: JSON.stringify(newRecipe),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => dispatch(addRecipe(response)))
  .catch(error => { console.log('recipe editing', error.message); alert('Recipe could not be edited\nError: '+error.message); });
}

