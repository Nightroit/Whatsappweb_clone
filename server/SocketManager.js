const io = require('./index.js')

const { VERIFY_USER, USER_CONNECTED, LOGOUT, COMMUNITY_CHAT } = require('../client/src/utils/Events')

const { createUser, createMessage, createChat } = require('../client/src/utils/Factories')

var connectedUsers = {}


module.exports = function(socket) {
    console.log("SocketID : " + socket.id);
    socket.on(VERIFY_USER, (nickname, callback) => {
        if(isUser(connectedUsers, nickname)) {
            callback({isUser: true, user: null})
        } else {
            // console.log(createUser({name: nickname}))
            callback({isUser: false, user: createUser({name: nickname})})
        }
    })
    socket.on(COMMUNITY_CHAT, (data) => {
        io.io.emit(COMMUNITY_CHAT, data)
    })
    socket.on(USER_CONNECTED, (user) => {
        connectedUsers = addUser(connectedUsers, user); 
        socket.user = user; 
        // console.log(i)
        io.io.emit(USER_CONNECTED, connectedUsers)
        // console.log(connectedUsers);
    })
    // verify Username
}

function addUser(userList, user) {
    console.log(user)
    let newList = Object.assign({}, userList)
    newList[user.name] = user
    return newList; 
}

function removeUser(userList, username) {

    let newList = Object.assign({}, userList)
    delete newList[username]; 
    return newList
}


function isUser(userList, username) {
    return username in userList;
}