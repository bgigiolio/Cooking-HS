import * as actionTypes from "./RecipesPage-types";

// deletes a user based on their ID
export const filterRecipes = (filterCategory) => {
    return {
        type: actionTypes.FILTER_RECIPES,
        payload: {
            category: filterCategory,
        }
    }
}

export const setInitialRecipes = (recipes) => {
    return {
      type: actionTypes.SET_INITIAL_RECIPES,
      payload: recipes,
    }
}