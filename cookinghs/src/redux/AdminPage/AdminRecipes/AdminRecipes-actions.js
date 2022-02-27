import * as actionTypes from "./AdminRecipes-types";

// deletes a user based on their ID
export const deleteRecipe = (recipeID) => {
    return {
        type: actionTypes.DELETE_RECIPE,
        payload: {
            id: recipeID,
        }
    }

}
