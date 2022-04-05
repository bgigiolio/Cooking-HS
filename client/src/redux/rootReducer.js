import {combineReducers} from 'redux';

import AdminUsersReducer from './AdminPage/AdminUsers/AdminUsers-reducer';
import AdminRecipesReducer from './AdminPage/AdminRecipes/AdminRecipes-reducer';
import AdminFlagsReducer from './AdminPage/AdminFlags/AdminFlags-reducer';
import UserRecipesReducer from './UserPage/UserRecipes/UserRecipes-reducer';
import { RecipesReducer } from './recipePage/recipe-reducer';
import RecipesPageReducer from './RecipesPage/RecipesPage-reducer';
import { UsersReducer } from './users/user-reducer';
import { CommentsReducer } from './comments/comment-reducer';
import { ReportsReducer } from './reports/report-reducer';

const rootReducer = combineReducers({
    AdminUsers: AdminUsersReducer,
    AdminRecipes: AdminRecipesReducer,
    AdminFlags: AdminFlagsReducer,
    UserRecipes: UserRecipesReducer,
    Recipes: RecipesReducer,
    RecipesPage: RecipesPageReducer,
    Users: UsersReducer,
    Comments: CommentsReducer,
    Reports: ReportsReducer
});

export default rootReducer;