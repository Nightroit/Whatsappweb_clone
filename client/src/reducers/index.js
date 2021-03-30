import {combineReducers} from 'redux'; 
import messages from './message'
import users from './users'
export default combineReducers({
    msg: messages, 
    users
})