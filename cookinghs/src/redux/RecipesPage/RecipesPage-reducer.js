import * as actionTypes from "./RecipesPage-types";
import { RECIPES } from '../../shared/RecipeList';

// const INITIAL_STATE = {
//     recipes: RECIPES};
// const INITIAL_STATE = RECIPES
const INITIAL_STATE = []

const RecipesPageReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        // case actionTypes.FILTER_RECIPES:
        //     return {
        //         ...state,
        //         recipes: state.recipes.filter(recipe => recipe.id !== action.payload.id)

        //     };
        case actionTypes.SET_INITIAL_RECIPES:
              return{
                ...state,
                recipes: action.payload,
              }
        default:
            return state;
    }


};

export default RecipesPageReducer;