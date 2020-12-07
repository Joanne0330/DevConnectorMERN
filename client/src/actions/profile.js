import axios from 'axios';
import { setAlert } from './alert';  //if there's an error, use setAlert in alert action to dispatch alert notification

import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    GET_REPOS
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

// ** Get all profiles
export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE});  //first, clear all the previous profile(s) first

    try {
        const res = await axios.get('/api/profile'); 
        
        dispatch({
            type: GET_PROFILES,
            payload: res.data 
        });

    } catch (err) {
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }  //the err msg and err status are from back end

        });
    }
};

// ** Get profile by ID
export const getProfileById = (userId) => async dispatch => {  //find the specific profile by user id
    try {
        const res = await axios.get(`/api/profile/user/${userId}`); 
        
        dispatch({
            type: GET_PROFILE,
            payload: res.data 
        });

    } catch (err) {
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }  //the err msg and err status are from back end

        });
    }
};

// ** Get Github repos
export const getGithubRepos = username => async dispatch => {  //pass in the github username
    try {
        const res = await axios.get(`/api/profile/github/${username}`); 
        
        dispatch({
            type: GET_REPOS,
            payload: res.data 
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


// ** Delete an experience
export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Removed', 'success' ));

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }  //the err msg and err status are from back end
        });
    }
};

// ** Delete an education
export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Removed', 'success' ));

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }  //the err msg and err status are from back end
        });
    }
};

// ** Delete the account
export const deleteAccount = () => async dispatch => { //don't need id, because it knows the token
    if(window.confirm('Are you sure? This can NOT be undone!')) {  //use window to give alarm
        try {
            await axios.delete('/api/profile');
    
            dispatch({ type: CLEAR_PROFILE });
            dispatch({ type: ACCOUNT_DELETED });  // dispatch in the auth reducer, same as LOGOUT

            dispatch(setAlert('You account has been permanently deleted'));
    
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }  //the err msg and err status are from back end
            });
        }
    }
};


