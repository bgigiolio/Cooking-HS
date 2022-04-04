import * as ActionTypes from './comment-types';
import { baseUrl } from '../../shared/baseUrl';

export const getComments = () => (dispatch) => {
    dispatch(commentsLoading(true));
    return fetch(baseUrl + 'api/comments', {
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
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(failComments(error.message)))
}

export const commentsLoading = () => ({
    type: ActionTypes.COMMENTS_LOADING
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

export const failComments = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
});

export const postComment = (comment) => (dispatch) => {
  console.log(comment)
  return fetch(baseUrl + 'api/comments', {
    method: "POST",
    body: JSON.stringify(comment),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => dispatch(addComment(response)))
  .catch(error => { console.log('comment creation', error.message); alert('Comment could not be posted\nError: '+error.message); });
}

export const editComment = (comment) => ({
  type: ActionTypes.EDIT_COMMENT,
  payload: comment
});

export const putComment = (_id, comment) => (dispatch) => {
  const newComment = {
    ...comment,
    _id: _id,
  };

  return fetch(baseUrl + 'api/comments/' + _id, {
    method: "PUT",
    body: JSON.stringify(newComment),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => dispatch(editComment(response)))
  .catch(error => { console.log('comment editing', error.message); alert('Comment could not be edited\nError: '+error.message); });
}

export const delComment = (_id) => ({
  type: ActionTypes.DELETE_COMMENT,
  payload: _id
});

export const deleteComment = (_id) => (dispatch) => {
  return fetch(baseUrl + 'api/comments/' + _id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => dispatch(delComment(_id)))
  .catch(error => { console.log('comment deleting', error.message); alert('Comment could not be deleted\nError: '+error.message); });
}