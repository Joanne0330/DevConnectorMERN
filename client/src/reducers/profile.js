import { 
    GET_PROFILE, 
    PROFILE_ERROR, 
    CLEAR_PROFILE, 
    UPDATE_PROFILE 
} from "../actions/types";


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
        case UPDATE_PROFILE:
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
        case CLEAR_PROFILE: //from auth action
            return {
                ...state,
                profile: null, //clearing
                repos: [],
                loading: false
            };

        default:
            return state;    
    }
}