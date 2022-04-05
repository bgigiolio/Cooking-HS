import * as actionTypes from "./AdminUsers-types";

// deletes a user based on their ID
export const deleteUser = (userID) => {
    return {
        type: actionTypes.DELETE_USER,
        payload: {
            id: userID,
        }
    }

}
