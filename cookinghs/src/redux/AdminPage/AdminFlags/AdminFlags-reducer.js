import * as actionTypes from "./AdminFlags-types";

const INITIAL_STATE = {
    // each flag has an id, user that reported, username, recipe, type(comment or recipe), desc
    flags: [ 
        {
            id: 1,
            key: '1',
            name: "Alan Baker",
            username: "abaker",
            recipe: "Mongolian Chicken",
            type: "Recipe",
            desc: "This recipe uses bad language, it's inappropriate",
        },
        {
            id: 2,
            key: '2',
            name: "Bob Collin",
            username: "bcbcbcbc",
            recipe: "Fried Chicken",
            type: "Comment",
            desc: "user haheh's comment is rude and uses lewd words.... shameful",
        },
        {
            id: 3,
            key: '3',
            name: "Danielle Eugene",
            username: "danielle",
            recipe: "Fried Chicken",
            type: "Recipe",
            desc: "bad - 0 stars",
        },
    ]
}

const AdminFlagsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case actionTypes.RESOLVE_FLAG:
            return {
                ...state,
                flags: state.flags.filter(flag => flag.id !== action.payload.id)

            };
        default:
            return state;
    }


};

export default AdminFlagsReducer;