import * as actionTypes from "./AdminFlags-types";

// deletes a user based on their ID
export const resolveFlag = (flagID) => {
    return {
        type: actionTypes.RESOLVE_FLAG,
        payload: {
            id: flagID,
        }
    }

}