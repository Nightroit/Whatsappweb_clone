import {AUTH_USER, AUTH_ERROR} from '../actions/types'; 

const INITIAL_STATE = {
    authenticated: '', 
    handle: '', 
    socketId: '',
    errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case AUTH_USER: 
            return {...state, authenticated: action.payload.token, handle: action.payload.handle, socketId: action.payload.socketId}; 
        case AUTH_ERROR: 
            return {...state, errorMessage: action.payload.error}; 
        default: 
            return state; 
    }
}