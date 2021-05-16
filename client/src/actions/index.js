import axios from 'axios'; 
import socket from '../utils/socket'
import {DATA_REQ, LOAD_USERS, USER_CONNECTED } from '../utils/Events'
import { AUTH_USER, AUTH_ERROR } from './types'
import { ScreenLockLandscapeTwoTone } from '@material-ui/icons';

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
        if(response.data.error) {
            dispatch({type: AUTH_ERROR, payload: {error: response.data.error}})
        } else {
            dispatch({type: AUTH_USER, payload: {token: response.data.token, handle: response.data.handle}})
            localStorage.setItem('token', response.data.token); 
        }
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

