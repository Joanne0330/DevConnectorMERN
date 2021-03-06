import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_POSTS,
    POST_ERROR, 
    UPDATE_LIKES, 
    DELETE_POST,
    ADD_POST,
    GET_POST, 
    ADD_COMMENT,
    REMOVE_COMMENT
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

// ** Add a post
export const addPost = formData => async dispatch => { 
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('api/posts', formData, config);
        
        dispatch({
            type: ADD_POST,
            payload: res.data
        });
        
        dispatch(setAlert('Post created!', 'success'));
    } catch (err) {
        
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }  //the err msg and err status are from back end

        });
    }
}

// ** Get post
export const getPost = id => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (err) {
        
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }  //the err msg and err status are from back end

        });
    }
}

// ** Add a comment
export const addComment = (postId, formData) => async dispatch => { 
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);
        
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });
        
        dispatch(setAlert('Comment added!', 'success'));
    } catch (err) {
        
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }  //the err msg and err status are from back end

        });
    }
}

// ** Delete comment
export const deleteComment = (postId, commentId) => async dispatch => { 
    try {
        await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
        
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId //returning the comment id to filter out the chosen comment in the UI
        });
        
        dispatch(setAlert('Comment removed!', 'success'));
    } catch (err) {
        
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }  //the err msg and err status are from back end

        });
    }
}