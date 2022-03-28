import * as ActionTypes from './recipe-types';

export const RecipesReducer = (
    state = { 
        isLoading: true,
        errMess: null, 
        recipes:[]
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_RECIPES:
            return {...state, isLoading: false, errMess: null, recipes: action.payload};
        
        case ActionTypes.RECIPES_LOADING:
            return {...state, isLoading: true, errMess: null, recipes: []}
        
        case ActionTypes.RECIPES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        case ActionTypes.ADD_RECIPE:
            var recipe = action.payload;
            return { ...state, recipes: state.recipes.concat(recipe)};

        default:
            return state;
    }
};