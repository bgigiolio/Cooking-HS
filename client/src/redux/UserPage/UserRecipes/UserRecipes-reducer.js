import * as actionTypes from "./UserRecipes-types";
import fried_chicken from "../../../components/Admin/foodpics/foodpic1.jpeg";
import b_w from "../../../components/Admin/foodpics/beef_welli.jpeg";
import bacon from "../../../components/Admin/foodpics/bacon.jpeg";
import berry_smoothie from "../../../components/Admin/foodpics/berry_smoothie.jpeg";

const INITIAL_STATE = {
    // each recipe has an id, img, name, desc
    //these recipes will differ per user so this is info based on backend
    recipes: [
        {
            id: 1,
            name: "Crispy Fried Chicken",
            desc: "Flour battered chicken fried to perfection",
            img: fried_chicken,
        },
        {
            id: 2,
            name: "Beef Wellington",
            desc: "You too can be Gordan Ramsey with beef and pastry!",
            img: b_w,
        },
        {
            id: 3,
            name: "Vegan Tofu Bacon",
            desc: "Tofu, Ricepaper and lots of seasoning!",
            img: bacon,
        },
        {
            id: 4,
            name: "Mixed Berry Smoothie",
            desc: "Grab any berry you have, add milk and sugar and you're done!",
            img: berry_smoothie,
        },
    ]
}

const UserRecipesReducer = (state = INITIAL_STATE, action) => {
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

export default UserRecipesReducer;