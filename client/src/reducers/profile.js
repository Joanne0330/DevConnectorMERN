import { 
    GET_PROFILE, 
    PROFILE_ERROR, 
    CLEAR_PROFILE, 
    UPDATE_PROFILE, 
    GET_PROFILES,
    GET_REPOS, 
    NO_REPOS
} from "../actions/types";


const initialState = {
    profile: null, //getting all of the individual profile data in here
    profiles: [], //all the developers for listing
    repos: [],
    loading: true,
    error: {}
};

// eslint-disable-next-line
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
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload, //the err msg and err status
                loading: false,
                profile: null
            };   
        case CLEAR_PROFILE: //from auth action
            return {
                ...state,
                profile: null, //clearing
                repos: [],
                loading: false
            };
        case GET_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false
            }
        case NO_REPOS:
            return {
                ...state,
                repos: []
            };
        default:
            return state;    
    }
}