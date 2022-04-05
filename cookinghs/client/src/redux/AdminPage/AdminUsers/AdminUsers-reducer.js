import * as actionTypes from "./AdminUsers-types";

const INITIAL_STATE = {
    // each user has an id, img, name, username
    users: [
        {
            id: 1,
            name: "Bob Adams",
            username: "bobadams1",
            img: "https://picsum.photos/318/180",
        },
        {
            id: 2,
            name: "Alice Lee",
            username: "alice_lee",
            img: "https://picsum.photos/318/180",
        },
        {
            id: 3,
            name: "Billy Terrone",
            username: "btbtbt",
            img: "https://picsum.photos/318/180",
        },
    ]
}

const AdminUsersReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case actionTypes.DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload.id)

            };
        default:
            return state;
    }


};

export default AdminUsersReducer;