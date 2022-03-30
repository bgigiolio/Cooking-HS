import * as ActionTypes from './comment-types';

export const CommentReducer = (
    state = { 
        comments:[]
    }, action) => {
    switch (action.type) {

        case ActionTypes.GET_COMMENT:
            console.log("getting a comment")
            const getIDComment = action.payload;
            return { 
                ...state, 
                comments: state.comments.filter((comment) => comment._id === getIDComment)
            };
            
        case ActionTypes.POST_COMMENT:
            console.log("adding a comment")
            const comment = action.payload;
            return {
                ...state,
                comments: state.comments.concat(comment)};
        
        // case ActionTypes.RECIPES_LOADING:
        //     return {...state, isLoading: true, errMess: null, recipes: []}
        
        // case ActionTypes.RECIPES_FAILED:
        //     return {...state, isLoading: false, errMess: action.payload};

        // case ActionTypes.ADD_RECIPE:
        //     alert("Created recipe successfully")
        //     /const recipe = action.payload;
        //     return { ...state, recipes: state.recipes.concat(recipe)};

        // case ActionTypes.EDIT_RECIPE:
        //     alert("Edited recipe successfully")
        //     const editedrecipe = action.payload;
        //     let editedrecipeinstate = state.recipes.find(recipe => recipe._id === recipe._id)
        //     editedrecipeinstate = editedrecipe
        //     return { ...state }


        case ActionTypes.DELETE_COMMENT:
            console.log("deleting a comment")
            const deleteIDComment = action.payload;
            return { 
                ...state, 
                comments: state.comments.filter((comment) => comment._id !== deleteIDComment)
            };

        default:
            return state;
    }
};