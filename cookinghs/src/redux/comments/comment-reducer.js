import * as ActionTypes from './comment-types';

export const CommentsReducer = (
    state = { 
        isLoading: true,
        errMess: null, 
        comments:[]
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            console.log("adding all comments")
            return {...state, isLoading: false, errMess: null, comments: action.payload};
        
        case ActionTypes.COMMENTS_LOADING:
            return {...state, isLoading: true, errMess: null, comments: []}
        
        case ActionTypes.COMMENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        case ActionTypes.ADD_COMMENT:
            alert("Created comment successfully")
            const comment = action.payload;
            return { ...state, comments: state.comments.concat(comment)};

        case ActionTypes.EDIT_COMMENT:
            alert("Edited comment successfully")
            const editedcomment = action.payload;
            return { ...state, comments: state.comments.filter((comment) => comment._id !== editedcomment._id).concat(editedcomment) }

        case ActionTypes.DELETE_COMMENT:
            const commentid = action.payload;
            return { ...state, comments: state.comments.filter((comment) => comment._id !== commentid)};

        default:
            return state;
    }
};