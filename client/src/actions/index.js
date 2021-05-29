import axios from 'axios'; 
import socket from '../utils/socket'
import {DATA_REQ, LOAD_USERS, SEND_MESSAGE, USER_CONNECTED } from '../utils/Events'
import { AUTH_USER, AUTH_ERROR } from './types'

export const clearRedux = () => async dispatch => {
    dispatch({type: AUTH_ERROR, payload: {error: ''}})
}

export const signup = (formProps, callback) => async dispatch => {
        if(formProps.password != formProps.confirmPassword) {
            dispatch({type: AUTH_ERROR, payload: {error: 'Password didn\'t match!'}})
            return;
        }
         if(formProps.email && formProps.email && formProps.handle) {
        try {
            const response = await axios.post(
                'http://localhost:3090/signup', 
                formProps
                );
                if(response) {
        
                    dispatch({type: AUTH_USER, payload: {token: response.data.token, handle: response.data.handle}})
                    localStorage.setItem('token', response.data.token); 
                    localStorage.setItem('handle', response.data.handle); 
                }
            callback(); 
        } 
        catch (err) {
            dispatch({type: AUTH_ERROR, payload: {error: 'Email in use'}});
        }
    } else {
        dispatch({type: AUTH_ERROR, payload: {error: 'All terms are not filled!'}})
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
    
            dispatch({type: AUTH_USER, payload: {token: response.data.token, handle: response.data.handle, socketId: response.data.socketId}})
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

