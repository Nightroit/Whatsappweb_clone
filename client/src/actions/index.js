import axios from 'axios'; 
import socket from '../utils/socket'
import {DATA_REQ, LOAD_USERS, USER_CONNECTED } from '../utils/Events'
import { AUTH_USER, AUTH_ERROR } from './types'
export const sendMessage = (msg, det) => ({
    message: msg,
    sender: det.sender, 
    reciever: det.reciever
})

export const loadUsers = (name, dispatch) => { 
    socket.emit(DATA_REQ, name); 
} 


export const signup = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post(
            'http://localhost:3090/signup', 
             formProps
            );

        dispatch({type: AUTH_USER, payload: {token: response.data.token, handle: response.data.handle}})
        localStorage.setItem('token', response.data.token); 
        callback(); 
    } 
    catch (err) {
        dispatch({type: AUTH_ERROR, payload: 'Email in use'});
    }
};

export const signin = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post(
            'http://localhost:3090/signin', 
             formProps
            );
        dispatch({type: AUTH_USER, payload: {token: response.data.token, handle: response.data.handle}})
        localStorage.setItem('token', response.data.token); 
        callback(); 
    } 
    catch (err) {
        dispatch({type: AUTH_ERROR, payload: 'Invalid login credential'});
    }
};

export const signout = () => {
    localStorage.removeItem('token'); 
    return {
        type: AUTH_USER, 
        payload: ''
    }
}

