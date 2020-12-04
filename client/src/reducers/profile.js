import { GET_PROFILE, PROFILE_ERROR } from "../actions/types";


const initialState = {
    profile: null, //getting all of the individual profile data in here
    profiles: [], //all the developers for listing
    repos: [],
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_PROFILE:
            return {
                ...state,  //spreadout the state
                profile: payload,  //set payload (everything of the profile) into profile
                loading: false
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload, //the err msg and err status
                loading: false
            };    
        default:
            return state;    
    }
}