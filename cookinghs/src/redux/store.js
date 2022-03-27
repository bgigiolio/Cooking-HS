import { createStore, applyMiddleware } from "redux";
import rootReducer from './rootReducer';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk), composeWithDevTools());

export default store;