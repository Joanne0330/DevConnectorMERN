import axios from 'axios';
import { setAlert } from './alert';  //bring the alert action if registration fails
import { 
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    USER_LOADED, 
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL, 
    LOGOUT, 
    // CLEAR_PROFILE 
} from './types';
import setAuthToken from '../utils/setAuthToken';  // a file that find the token in localStorage and sets in global headers


// **Load User: 
// after getting the token, send to the back for varification
export const loadUser = () => async dispatch => {
    if(localStorage.token) { //if window.localStorage from reducer has the token
        setAuthToken(localStorage.token);  //use the setAuthToken function to set to global headers
    }

    try {  //headers is set, now make request to the back
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data  //data from the back is the user (id, name, email, avatar)
        })
    } catch (err) {

        dispatch({
            type: AUTH_ERROR
        });      
    }
};


// **Register User: 
// (using axios to send register obj and async await)
export const register = ({ name, email, password }) => async dispatch => { //similar to post request if done in the component
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password }); //format the 3 fields

    try {
        const res = await axios.post('/api/users', body, config);
        
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data  //getting the token from the back and set to payload
        });

        dispatch(loadUser()); //dispatch loadUser function above to send the token back to get users info

    } catch (err) {
        const errors = err.response.data.errors; // getting the response from the err array

        if(errors) {  //if errors, calling the setAlert action using the errors array we have in the backend
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger'))); //passing in the error message(s) from the backend and the type to setAlert
        }

        dispatch({
            type: REGISTER_FAIL
        });
    }
};

// **Login User: 
// (using axios to send login info and async await)
export const login = (email, password) => async dispatch => { 
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password }); //format the fields

    try {
        const res = await axios.post('/api/auth', body, config);  //get authenticaton
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data  //getting the token from the back and set to payload
        });

        dispatch(loadUser()); //dispatch loadUser function above to send token to the back and bring up users info

    } catch (err) {
        const errors = err.response.data.errors; // getting the response from the err array

        if(errors) {  //if errors, calling the setAlert action using the errors array we have in the backend
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger'))); //passing in the error message(s) from the backend and the type to setAlert
        }

        dispatch({
            type: LOGIN_FAIL
        });
    }
};

//** Logout /Clear Profile
export const logout = () => dispatch => {
    // dispatch({
    //     type: CLEAR_PROFILE
    // });
    dispatch({ 
        type: LOGOUT 
    });
}