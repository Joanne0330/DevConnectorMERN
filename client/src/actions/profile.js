import axios from 'axios';
import { setAlert } from './alert';  //if there's an error, use setAlert in alert action to dispatch alert notification

import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE
} from './types';

// ** Get current users profile
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

//** Create and update profile
export const createProfile = (formData, history, edit = false ) => async dispatch => { //history will rediect to client side route
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);

        dispatch({ //after posting the info, we use get profile to see the new or updated info
            type: GET_PROFILE,
            payload: res.data   
        });

        // after getting the profile, we update a message in the alert with the following messages:
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'), 'success' ); //positive alert messages with success as a type to turn the alert green

        if(!edit) {  //if creating the profile, then we'll redirect to dashborad
            history.push('/dashboard');
        }
        
    } catch (err) {
        const errors = err.response.data.errors; // getting the response from the err array

        if(errors) {  //if errors, calling the setAlert action using the errors array we have in the backend
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger'))); //passing in the error message(s) from the backend and the type to setAlert
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }  //the err msg and err status are from back end
        });
    }
};

// ** Add Experience
export const addExperience = (formData, history) => async dispatch => {  //taking in the input fields, and history to redirect to dashboard
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/experience', formData, config);

        dispatch({ //after updating the info, we use get profile to see the new or updated info
            type: UPDATE_PROFILE,
            payload: res.data   
        });

        // after getting the profile, we update a message in the alert with the following messages:
        dispatch(setAlert('Experience Added', 'success' )); //positive alert messages with success as a type to turn the alert 'succes' color

        history.push('/dashboard'); //redirecting to dashboard

        
    } catch (err) {
        const errors = err.response.data.errors; // getting the response from the err array

        if(errors) {  //if errors, calling the setAlert action using the errors array we have in the backend
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger'))); //passing in the error message(s) from the backend and the type to setAlert
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }  //the err msg and err status are from back end
        });
    }
};

// ** Add Education
export const addEducation = (formData, history) => async dispatch => {  //taking in the input fields, and history to redirect to dashboard
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/education', formData, config);

        dispatch({ //after updating the info, we use get profile to see the new or updated info
            type: UPDATE_PROFILE,
            payload: res.data   
        });

        // after getting the profile, we update a message in the alert with the following messages:
        dispatch(setAlert('Education Added', 'success' )); //positive alert messages with success as a type to turn the alert 'succes' color

        history.push('/dashboard'); //redirecting to dashboard

        
    } catch (err) {
        const errors = err.response.data.errors; // getting the response from the err array

        if(errors) {  //if errors, calling the setAlert action using the errors array we have in the backend
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger'))); //passing in the error message(s) from the backend and the type to setAlert
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }  //the err msg and err status are from back end
        });
    }
};