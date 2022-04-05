import * as ActionTypes from './user-types';
import { baseUrl } from '../../shared/baseUrl';

export const getUsers = () => (dispatch) => {
    dispatch(usersLoading(true));
    return fetch(baseUrl + 'api/users/search', {
      credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        var errmess = new Error(error.message);
        throw errmess;
    }).then(response => response.json())
    .then(users => dispatch(addUsers(users)))
    .catch(error => dispatch(failUsers(error.message)))
}

export const usersLoading = () => ({
    type: ActionTypes.USERS_LOADING
});

export const addUsers = (users) => ({
  type: ActionTypes.ADD_USERS,
  payload: users
});

export const failUsers = (errMess) => ({
    type: ActionTypes.USERS_FAILED,
    payload: errMess
})