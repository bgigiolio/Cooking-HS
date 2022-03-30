import {combineReducers} from 'redux';

import AdminUsersReducer from './AdminPage/AdminUsers/AdminUsers-reducer';
import AdminRecipesReducer from './AdminPage/AdminRecipes/AdminRecipes-reducer';
import AdminFlagsReducer from './AdminPage/AdminFlags/AdminFlags-reducer';
import UserRecipesReducer from './UserPage/UserRecipes/UserRecipes-reducer';
import { RecipesReducer } from './recipePage/recipe-reducer';
import RecipesPageReducer from './RecipesPage/RecipesPage-reducer';
import CommentsReducer from './CommentPage/comment-reducer';

const rootReducer = combineReducers({
    AdminUsers: AdminUsersReducer,
    AdminRecipes: AdminRecipesReducer,
    AdminFlags: AdminFlagsReducer,
    UserRecipes: UserRecipesReducer,
    Recipes: RecipesReducer,
    RecipesPage: RecipesPageReducer,
    Comments: CommentsReducer
});

export default rootReducer;