import {AUTH_USER, AUTH_ERROR} from '../actions/types'; 

const INITIAL_STATE = {
    authenticated: '', 
    handle: '', 
    errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case AUTH_USER: 
            // console.log(action.payload)
            return {...state, authenticated: action.payload.token, handle: action.payload.handle}; 
        case AUTH_ERROR: 
            return {...state, errorMessage: action.payload}; 
        default: 
            return state; 
    }
}