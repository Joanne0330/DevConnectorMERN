import { SET_ALERT, REMOVE_ALERT } from '../actions/types'; //bring in the variables from actions dir

//state for alert:
const initialState = []; //an empty array which will have objs within of alert and its msg and id, etc

//it's a function that takes in a state and action. Action is dispatched from action file
 // eslint-disable-next-line
export default function(state = initialState, action) { //action contains 2 things: type and payload obj with msg, id, and alertType
    const { type, payload } = action; //destructoring action.type, action.payload
    
    switch(type) {    //evaluating type objects:
        case SET_ALERT:  //the type is SET_ALERT
            return [...state, payload] //setting a new alert(with data from action.payload, incl msg, id... ) to the array, which may have existing state so we need to spread and add to them
    
        case REMOVE_ALERT: //the type is REMOVE_ALERT and we filter out the id
            return state.filter(alert => alert.id !== payload)  //action.payload is just an id
        default:
            return state;
    }
}