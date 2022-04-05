import * as ActionTypes from './user-types';

export const UsersReducer = (
    state = { 
        isLoading: true,
        errMess: null,
        users: []
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_USERS:
            console.log("adding all users")
            return {...state, isLoading: false, errMess: null, users: action.payload};
        
        case ActionTypes.USERS_LOADING:
            return {...state, isLoading: true, errMess: null, users: []}
        
        case ActionTypes.USERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};