import * as actionTypes from "./AdminRecipes-types";
import b_w from "../../../components/Admin/foodpics/beef_welli.jpeg";
import bacon from "../../../components/Admin/foodpics/bacon.jpeg";
import berry_smoothie from "../../../components/Admin/foodpics/berry_smoothie.jpeg";

const INITIAL_STATE = {
    // each recipe has an id, img, name, desc
    recipes: [
        {
            id: 1,
            name: "Beef Wellington",
            desc: "You too can be Gordan Ramsey with beef and pastry!",
            img: b_w,
        },
        {
            id: 2,
            name: "Vegan Tofu Bacon",
            desc: "Tofu, Ricepaper and lots of seasoning!",
            img: bacon,
        },
        {
            id: 3,
            name: "Mixed Berry Smoothie",
            desc: "Grab any berry you have, add milk and sugar and you're done!",
            img: berry_smoothie,
        },
    ]
}

const AdminRecipesReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case actionTypes.DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter(recipe => recipe.id !== action.payload.id)

            };
        default:
            return state;
    }


};

export default AdminRecipesReducer;