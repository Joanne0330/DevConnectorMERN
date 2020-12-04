import axios from 'axios';
import { setAlert } from './alert';  //if there's an error, use setAlert in alert action to dispatch alert notification

import {
    GET_PROFILE,
    PROFILE_ERROR
} from './types';

// **Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me'); // don't need to pass on the id, App.js already knows the token at this point
        
        dispatch({
            type: GET_PROFILE,
            payload: res.data   //returns with profile date (everything) to be put in the state
        });

    } catch (err) {
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }  //the err msg and err status are from back end

        });
    }
};