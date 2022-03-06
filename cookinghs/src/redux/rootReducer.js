import {combineReducers} from 'redux';

import AdminUsersReducer from './AdminPage/AdminUsers/AdminUsers-reducer';
import AdminRecipesReducer from './AdminPage/AdminRecipes/AdminRecipes-reducer';
import AdminFlagsReducer from './AdminPage/AdminFlags/AdminFlags-reducer';
import UserRecipesReducer from './UserPage/UserRecipes/UserRecipes-reducer';

const rootReducer = combineReducers({
    AdminUsers: AdminUsersReducer,
    AdminRecipes: AdminRecipesReducer,
    AdminFlags: AdminFlagsReducer,
    UserRecipes: UserRecipesReducer
});

export default rootReducer;