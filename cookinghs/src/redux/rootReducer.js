import {combineReducers} from 'redux';

import AdminUsersReducer from './AdminPage/AdminUsers/AdminUsers-reducer';
import AdminRecipesReducer from './AdminPage/AdminRecipes/AdminRecipes-reducer';

const rootReducer = combineReducers({
    AdminUsers: AdminUsersReducer,
    AdminRecipes: AdminRecipesReducer,
});

export default rootReducer;