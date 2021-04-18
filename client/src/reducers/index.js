import {combineReducers} from 'redux'; 
import messages from './message'
import users from './users'
import auth from './auth'
import {reducer as formReducer} from 'redux-form'; 

export default combineReducers({
    auth, 
    form: formReducer,
    msg: messages, 
    users
});