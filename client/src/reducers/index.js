import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';

// this is the root reducer and bringing in other reducers
export default combineReducers({
    alert, 
    auth,
    profile,
    post
});