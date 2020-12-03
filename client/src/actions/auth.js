import axios from 'axios';
import { setAlert } from './alert';  //bring the alert action if registration fails
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

//Register User (using axios to send register obj and async await)
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