import * as ActionTypes from './recipe-types';

export const RecipesReducer = (
    state = { 
        isLoading: true,
        errMess: null, 
        recipes:[],
        filtered_recipes:[],
        title: "",
        cuisines: [],
        ingredients: [],
        cooktime: [6],
        difficulty: [4],
        course: [""],
        sort:["date"]
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_RECIPES:
            console.log("adding all recipes")
            return {...state, isLoading: false, errMess: null, recipes: action.payload};
        
        // for the filtered recipes on the landing page
        case ActionTypes.ADD_FILTERED_RECIPES:
        console.log("adding filtered recipes")
        return {...state, isLoading: false, errMess: null, filtered_recipes: action.payload};


        case ActionTypes.ADD_CUISINES:
            const cus = action.payload
            return { ...state, cuisines: state.cuisines.concat(cus)};

        
        case ActionTypes.REMOVE_CUISINES:
            const c = action.payload
            return {...state, cuisines: state.cuisines.filter((cuisine) => cuisine !== c)};

        case ActionTypes.ADD_INGREDIENTS:
            const ing = action.payload
            return { ...state, ingredients: state.ingredients.concat(ing)};

        
        case ActionTypes.REMOVE_INGREDIENTS:
            const ingr = action.payload
            return {...state, ingredients: state.ingredients.filter((ingredient) => ingredient !== ingr)};

        case ActionTypes.UPDATE_DIFFICULTY:
            const d = action.payload
            return { ...state, difficulty: state.difficulty.concat(d)};
        
        case ActionTypes.UPDATE_COOKTIME:
        const ct = action.payload
        return { ...state, cooktime: state.cooktime.concat(ct)};

        case ActionTypes.UPDATE_COURSE:
            const course = action.payload
            return { ...state, course: state.course.concat(course)};
        
        case ActionTypes.UPDATE_SORT:
        const s = action.payload
        return { ...state, sort: state.sort.concat(s)};


        
        
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