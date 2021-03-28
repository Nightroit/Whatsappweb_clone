const io = require('./index.js')

const { VERIFY_USER, USER_CONNECTED, LOGOUT, COMMUNITY_CHAT } = require('../client/src/utils/Events')

const { createUser, createMessage, createChat } = require('../client/src/utils/Factories')

var connectedUsers = {
    "Shivam": {
        msg:{
                "Divyank": ["Hi", "I'll do that%"],
                "Dhurba": ["Hi", "How are you", "I'm good"] 
            },
        connections: [      {
            "name": "Divyank", 
            "phone_number": "9999999999",
            "lastMessage" : "Oh, really xd", 
        }, {
            "name" : "Dhurba", 
            "phone_number": "8888888888",
            "lastMessage" : "No idea",
        }], 
        id: "", 
    },
    "Dhurba" : {
        msg: {
            "Shivam": ["Hi", "How are you", "I'm good"] 
        }, 
        connections: [{
            "name": "Shivam", 
            "phone_number": "8076300121", 
            "lastMessage": "Jeff"
        }]
    },
    "Divyank" : {
        msg: {
            "Shivam": ["Hi", "I'll do that%"]
        }, 
        connections: [{
            "name" : "Shivam", 
            "lastMessage": "Okay, I'll send email..."
        }]
    }
}


module.exports = function(socket) {
    socket.on(VERIFY_USER, (nickname, callback) => {
        if(isUser(connectedUsers, nickname)) {
            callback({isUser: true, user: null})
        } else {
            // console.log(createUser({name: nickname}))
            callback({isUser: false, user: createUser({name: nickname})})
        }
    })
    socket.on(COMMUNITY_CHAT, (data) => {
        console.log(data)
        io.io.to(connectedUsers[data.reciever]["id"]).emit(COMMUNITY_CHAT, data)
        // io.io.emit(COMMUNITY_CHAT, data)
    })
    socket.on(USER_CONNECTED, (name) =>  {
        connectedUsers = updateId({name, id: socket.id}); 
        socket.emit("DATA_RES", connectedUsers)
        
    })
    // verify Username
}

function updateId(user) {
    connectedUsers[user.name]["id"] = user.id;
    return connectedUsers;
}

function removeUser(userList, username) {
    let newList = Object.assign({}, userList)
    delete newList[username]; 
    return newList
}


function isUser(userList, username) {
    return username in userList;
}