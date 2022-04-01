import * as ActionTypes from './comment-types';

export const CommentReducer = (
    state = { 
        comments:[]
    }, action) => {
    switch (action.type) {

        // case ActionTypes.ADD_RECIPES:
        //     console.log("adding all recipes")
        //     return {...state, isLoading: false, errMess: null, recipes: action.payload};

        case ActionTypes.ADD_COMMENTS:
            console.log("adding all comment")
            return {
                ...state,
                 recipes: action.payload
            };

        // case ActionTypes.GET_COMMENT: //TODO - going to rename this
        //     console.log("getting a comment")
        //     const getIDComment = action.payload;
        //     return { 
        //         ...state, 
        //         comments: state.comments.filter((comment) => comment._id === getIDComment)
        //     };
            
        case ActionTypes.ADD_COMMENT: //TODO - this is what is actually POST comment but taking this from ADD_RECIPE
            console.log("adding a comment")
            const comment = action.payload;
            return {
                ...state,
                comments: state.comments.concat(comment)
            };
        
        case ActionTypes.COMMENTS_LOADING:
            return {
                ...state, 
                comments: []
            }
        
        case ActionTypes.COMMENTS_FAILED:
            return {
                ...state
            };

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

export default CommentReducer;