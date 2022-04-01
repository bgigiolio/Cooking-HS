import * as ActionTypes from './recipe-types';

export const RecipesReducer = (
    state = { 
        isLoading: true,
        errMess: null, 
        recipes:[],
        filtered_recipes:[]
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_RECIPES:
            console.log("adding all recipes")
            return {...state, isLoading: false, errMess: null, recipes: action.payload};
        
        // for the filtered recipes on the landing page
        case ActionTypes.ADD_FILTERED_RECIPES:
        console.log("adding filtered recipes")
        return {...state, isLoading: false, errMess: null, filtered_recipes: action.payload};
        
        case ActionTypes.RECIPES_LOADING:
            return {...state, isLoading: true, errMess: null, recipes: []}
        
        case ActionTypes.RECIPES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        case ActionTypes.ADD_RECIPE:
            alert("Created recipe successfully")
            const recipe = action.payload;
            return { ...state, recipes: state.recipes.concat(recipe)};

        case ActionTypes.EDIT_RECIPE:
            alert("Edited recipe successfully")
            const editedrecipe = action.payload;
            return { ...state, recipes: state.recipes.filter((recipe) => recipe._id !== editedrecipe._id).concat(editedrecipe) }

        case ActionTypes.DELETE_RECIPE:
            const recipeid = action.payload;
            return { ...state, recipes: state.recipes.filter((recipe) => recipe._id !== recipeid)};

        default:
            return state;
    }
};