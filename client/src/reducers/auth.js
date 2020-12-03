import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR } from '../actions/types';

//state for authentication: 
const initialState = {  //initial state is an obj to store the token we recieve and place in a local storage
    token: localStorage.getItem('token'),  //localStorage is prvided by JS windows 
    isAuthenticated: null,
    loading: true, 
    user: null 
};

// eslint-disable-next-line
export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload  // getting the payload from res.data in action, which incl name, email, id, avatar...
            };

        case REGISTER_SUCCESS:    //after registration, user is logged in therefore we need the token now
            localStorage.setItem('token', payload.token); // set the token (the payload obj from back-end) inside localStorage
            return {
                ...state,  //spread out the initial state and payload from the back
                ...payload, 
                isAuthenticated: true,
                loading: false
            };

        case REGISTER_FAIL:
        case AUTH_ERROR:
            localStorage.removItem('token'); //remove antying in localStorage
            return {
                ...state,
                token: null,  //setting to null for complete removal
                isAuthenticated: false,
                loading: false   //done loading even it failed
            };    

        default:
            return state; 
    }
}