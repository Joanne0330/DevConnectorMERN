//when token obtained, we will send it with every request:

import axios from 'axios';  //just adding a global header

const setAuthToken = token => {  //take in the token as a parameter and check
    if(token) {  //check if there's token in the localStorage, if there is:
        axios.defaults.headers.common['x-auth-token'] = token;    //set the global headers to token
        localStorage.setItem('token', token);
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
};

export default setAuthToken;