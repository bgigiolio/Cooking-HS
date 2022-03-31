import * as ActionTypes from './recipe-types';
import { baseUrl } from '../../shared/baseUrl';

export const getRecipes = () => (dispatch) => {
    dispatch(recipesLoading(true));
    return fetch(baseUrl + 'api/recipes', {
      credentials: 'same-origin'
    })
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
  // console.log(imagefile)
  
  // const form = new FormData()
  // form.append('author', author)
  // form.append('parent', parent)
  // form.append('title', title)
  // form.append('description', description)
  // form.append('ingredients', ingredients)
  // form.append('steps', steps)
  // form.append('course', course)
  // form.append('cuisine', cuisine)
  // form.append('preptime', preptime)
  // form.append('cooktime', cooktime)
  // form.append('servings', servings)
  // form.append('image', imagefile)
  // form.append('averageRating', 0)
  // form.append('difficulty', difficulty)

  // console.log(form.get('image'))
  
  const newRecipe = {
    author: author,
    parent: parent,
    title: title,
    description: description,
    ingredients: ingredients,
    steps: steps,
    course: course,
    cuisine: cuisine,
    preptime: preptime,
    cooktime: cooktime,
    servings: servings,
    image: image,
    averageRating: 0,
    difficulty: difficulty
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

export const editRecipe = (recipe) => ({
  type: ActionTypes.EDIT_RECIPE,
  payload: recipe
});

export const putRecipe = (_id, author, parent, title, description, ingredients, steps, difficulty, course, cuisine, preptime, cooktime, servings, image) => (dispatch) => {
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
  .then(response => dispatch(editRecipe(response)))
  .catch(error => { console.log('recipe editing', error.message); alert('Recipe could not be edited\nError: '+error.message); });
}

export const delRecipe = (_id) => ({
  type: ActionTypes.DELETE_RECIPE,
  payload: _id
});

export const deleteRecipe = (_id) => (dispatch) => {
  return fetch(baseUrl + 'api/recipes/' + _id, {
    method: "DELETE",
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
  .then(response => dispatch(delRecipe(_id)))
  .catch(error => { console.log('recipe deleting', error.message); alert('Recipe could not be deleted\nError: '+error.message); });
}