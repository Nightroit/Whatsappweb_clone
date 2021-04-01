const io = require('./index.js')

const { VERIFY_USER, USER_CONNECTED, LOGOUT, COMMUNITY_CHAT, DATA_REQ, LOAD_MESSAGES } = require('../client/src/utils/Events')

const { createUser, createMessage, createChat } = require('../client/src/utils/Factories')

var connectedUsers = {
    users: {
        "Shivam": {
                connections: ["Dhurba", "Divyank"], 
                socketId: '', 
            }, 
            "Dhurba": {
                connections: ["Prateek", "Ritesh"], 
                socketId: '', 
            }, 
            "Divyank": {
                connections: ["Shivam"],
                socketId: '', 
            }
    },
    messages: {        // In future will make address this using hashing, just for the sake of JUGAAD rn ;P
        "ShivamDivyank": [
            {msg: "Hi, Divyank", reciever: "Divyank", sender: "Shivam", messageId: 1},
            {msg: "Hi, Shivam", reciever: "Shivam", sender: "Divyank", messageId: 2}
                        ], 
        "ShivamDhurba": [
            {msg: "Hi, Dhurba", reciever: "Dhurba", sender: "Shivam", messageId: 1},
            {msg: "Hi, Shivam", reciever: "Shivam", sender: "Dhurba", messageId: 2}
        ]
    }
}


function socket(socket){
    socket.on(VERIFY_USER, (nickname, callback) => {
        if(isUser(connectedUsers, nickname)) {
            callback({isUser: true, user: null})
        } else {
            // console.log(createUser({name: nickname}))
            callback({isUser: false, user: createUser({name: nickname})})
        }
    })
    socket.on(COMMUNITY_CHAT, (data) => {
        io.io.to(connectedUsers[data.reciever]["id"]).emit(COMMUNITY_CHAT, data);
        addMessage(data)
        
    })
    socket.on(USER_CONNECTED, (name) =>  {
        connectedUsers = updateId({name, id: socket.id}); 
        socket.emit(DATA_REQ, connectedUsers)
    })

    socket.on(DATA_REQ, (name, fn) => {
        socket.emit(DATA_REQ, connectedUsers.users[name].connections); 
    })

    function updateId(user) {
        connectedUsers[user.name]["id"] = user.id;
        return connectedUsers;
    }

    function addMessage(data) {
        connectedUsers[data.reciever]["msg"][data.sender].push(data);
        connectedUsers[data.sender]["msg"][data.reciever].push(data);

    }

    function removeUser(userList, username) {
        let newList = Object.assign({}, userList)
        delete newList[username]; 
        return newList
    }


    function isUser(userList, username) {
        return username in userList;
    }
}

module.exports =  {connectedUsers, socket}