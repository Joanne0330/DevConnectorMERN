import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'; //middleware
import rootReducer from './reducers'; // multi reducers to combine in root reducer


const initialState = {}; //empty obj

const middleware = [thunk]; //our only middleware

const store = createStore( //
    rootReducer, 
    initialState, //the empty obj
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;