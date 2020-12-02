import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {  //thunk middleware allowing dispatch more than one action types
    const id = uuidv4(); 
    dispatch({  //calling the set alert in the reducer
        type: SET_ALERT,
        payload: { msg, alertType, id}
    });

    setTimeout(() => //dispatching the REMOVE_ALERT after 5 sec
        dispatch({ type: REMOVE_ALERT, payload: id}), timeout
    );
};