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