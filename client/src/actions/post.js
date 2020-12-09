import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_POSTS,
    POST_ERROR, 
    UPDATE_LIKES, 
    DELETE_POST
} from './types';


// ** Get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (err) {
        
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }  //the err msg and err status are from back end

        });
    }
}

// ** Add like
export const addLike = id => async dispatch => { //passing in the post id
    try {
        const res = await axios.put(`api/posts/like/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data } //returning array of likes and the post id 
        });
    } catch (err) {
        
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }  //the err msg and err status are from back end

        });
    }
}

// ** Remove like
export const removeLike = id => async dispatch => { //passing in post id
    try {
        const res = await axios.put(`api/posts/unlike/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data } //returning the post Id and the array of likes
        });
    } catch (err) {
        
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }  //the err msg and err status are from back end

        });
    }
}

// **Delete post
export const deletePost= id => async dispatch => { //passing in post id
    try {
        await axios.delete(`api/posts/${id}`);

        dispatch({
            type: DELETE_POST,
            payload: id //just give the post id to send to the reducer to filter out in the UI
        });

        dispatch(setAlert('Post removed!', 'success'));
    } catch (err) {
        
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }  //the err msg and err status are from back end

        });
    }
}