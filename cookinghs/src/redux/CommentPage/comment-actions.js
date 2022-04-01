//TODO TODO TODO - there's probably some confusion between AddComment & GetComment here (would need to fix)

import * as ActionTypes from './comment-types';
import { baseUrl } from '../../shared/baseUrl';

export const getComments = () => (dispatch) => {
    dispatch(commentsLoading(true)); 
    return fetch(baseUrl + 'api/comments') //add method GET here as body
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
    .then(comments => dispatch(addComments(comments))) //
    .catch(error => dispatch(failComments(error.message)))
}

export const commentsLoading = () => ({
    type: ActionTypes.COMMENTS_LOADING //add to the reducer
});

export const addComments = (recipes) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: recipes
});

export const failComments = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

// export const addRecipe = (recipe) => ({
//   type: ActionTypes.ADD_RECIPE,
//   payload: recipe
// });

// export const postRecipe = (author, parent, title, description, ingredients, steps, difficulty, course, cuisine, preptime, cooktime, servings, image) => (dispatch) => {
//   const newRecipe = {
//     author: author,
//     parent: parent,
//     title: title,
//     description: description,
//     ingredients: ingredients,
//     steps: steps,
//     difficulty: difficulty,
//     course: course,
//     cuisine: cuisine,
//     preptime: preptime,
//     cooktime: cooktime,
//     servings: servings,
//     image: image,
//     averageRating: 0,
//     comments: []
//   };

//   return fetch(baseUrl + 'api/recipes', {
//     method: "POST",
//     body: JSON.stringify(newRecipe),
//     headers: {
//       "Content-Type": "application/json"
//     },
//     credentials: "same-origin"
//   })
//   .then(response => {
//       if (response.ok) {
//         return response;
//       } else {
//         var error = new Error('Error ' + response.status + ': ' + response.statusText);
//         error.response = response;
//         throw error;
//       }
//     },
//     error => {
//           throw error;
//     })
//   .then(response => response.json())
//   .then(response => dispatch(addRecipe(response)))
//   .catch(error => { console.log('recipe creation', error.message); alert('Recipe could not be posted\nError: '+error.message); });
// }


export const postComment = (recipeid, user, rating, content) => (dispatch) => {

    const newComment = {
        recipeid: recipeid,
        user: user,
        rating: rating,
        content: content
    };
    newComment.date = new Date().toISOString();
    
    return fetch(baseUrl + 'api/comments', {
        method: "POST",
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
    .then(response => dispatch(addComment(response)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};


// export const editRecipe = (recipe) => ({
//   type: ActionTypes.EDIT_RECIPE,
//   payload: recipe
// });

// export const putRecipe = (_id, author, parent, title, description, ingredients, steps, difficulty, course, cuisine, preptime, cooktime, servings, image) => (dispatch) => {
//   const newRecipe = {
//     _id: _id,
//     author: author,
//     parent: parent,
//     title: title,
//     description: description,
//     ingredients: ingredients,
//     steps: steps,
//     difficulty: difficulty,
//     course: course,
//     cuisine: cuisine,
//     preptime: preptime,
//     cooktime: cooktime,
//     servings: servings,
//     image: image,
//     averageRating: 0,
//     comments: []
//   };

//   return fetch(baseUrl + 'api/recipes/' + _id, {
//     method: "PUT",
//     body: JSON.stringify(newRecipe),
//     headers: {
//       "Content-Type": "application/json"
//     },
//     credentials: "same-origin"
//   })
//   .then(response => {
//       if (response.ok) {
//         return response;
//       } else {
//         var error = new Error('Error ' + response.status + ': ' + response.statusText);
//         error.response = response;
//         throw error;
//       }
//     },
//     error => {
//           throw error;
//     })
//   .then(response => response.json())
//   .then(response => dispatch(editRecipe(response)))
//   .catch(error => { console.log('recipe editing', error.message); alert('Recipe could not be edited\nError: '+error.message); });
// }

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
  .catch(error => { console.log('recipe deleting', error.message); alert('Recipe could not be deleted\nError: '+error.message); });
}

// Comments Actions
export const addComment = (comment) => ({ //TODO - Perhaps this should be POST to be very clear, but 
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

// export const postComment = (dishId, rating, author, comment) => (dispatch) => {

//     const newComment = {
//         dishId: dishId,
//         rating: rating,
//         author: author,
//         comment: comment
//     };
//     newComment.date = new Date().toISOString();
    
//     return fetch(baseUrl + 'comments', {
//         method: "POST",
//         body: JSON.stringify(newComment),
//         headers: {
//           "Content-Type": "application/json"
//         },
//         credentials: "same-origin"
//     })
//     .then(response => {
//         if (response.ok) {
//           return response;
//         } else {
//           var error = new Error('Error ' + response.status + ': ' + response.statusText);
//           error.response = response;
//           throw error;
//         }
//       },
//       error => {
//             throw error;
//       })
//     .then(response => response.json())
//     .then(response => dispatch(addComment(response)))
//     .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
// };



// export const fetchComments = () => (dispatch) => {    
//   return fetch(baseUrl + 'comments')
//   .then(response => {
//       if (response.ok) {
//         return response;
//       } else {
//         var error = new Error('Error ' + response.status + ': ' + response.statusText);
//         error.response = response;
//         throw error;
//       }
//     },
//     error => {
//           var errmess = new Error(error.message);
//           throw errmess;
//     })
//   .then(response => response.json())
//   .then(comments => dispatch(addComments(comments)))
//   .catch(error => dispatch(commentsFailed(error.message)));
// };

// export const commentsFailed = (errmess) => ({
//   type: ActionTypes.COMMENTS_FAILED,
//   payload: errmess
// });

// export const addComments = (comments) => ({
//   type: ActionTypes.ADD_COMMENTS,
//   payload: comments
// });