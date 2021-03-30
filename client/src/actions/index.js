import socket from '../utils/socket'
import {DATA_REQ, LOAD_USERS, USER_CONNECTED } from '../utils/Events'

export const sendMessage = (msg, det) => ({
    message: msg,
    sender: det.sender, 
    reciever: det.reciever
})

export const loadUsers = (name, dispatch) => { 
    var data;
    socket.emit(DATA_REQ, name, function(res) {
        console.log(res); 
    })
    // console.log(data); 
}

export default 