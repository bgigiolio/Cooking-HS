import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from './rootReducer';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';

const enhancers = [applyMiddleware(thunk), composeWithDevTools()]
const store = createStore(rootReducer, compose(...enhancers));

export default store;