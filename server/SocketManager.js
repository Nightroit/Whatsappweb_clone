const io = require('./index.js')
const { VERIFY_USER, USER_CONNECTED, LOGOUT, COMMUNITY_CHAT, DATA_REQ, LOAD_MESSAGES, UPDATE_DB } = require('./constants/index')

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


function socket(socket) {
    socket.on(VERIFY_USER, (nickname, callback) => {
        if(isUser(connectedUsers, nickname)) {
            callback({isUser: true, user: null})
        } else {
            callback({isUser: false, user: createUser({name: nickname})})
        }
    })

    // MAIN_CHAT SOCKET
    socket.on(COMMUNITY_CHAT, (data) => {
        io.io.to(connectedUsers.users[data.reciever]["socketId"]).emit(COMMUNITY_CHAT, data);
    })

    socket.on(USER_CONNECTED, (name) =>  {
        updateId({name, id: socket.id});
    })

    socket.on(DATA_REQ, (name) => {

        console.log(name)
        socket.emit(DATA_REQ, connectedUsers.users[name].connections); 
    })

    socket.on(UPDATE_DB, (data) => {
        let s = data.sender, r = data.reciever; 
        if(s > r) h = s+r; 
        else h = r+s; 
 
        connectedUsers.messages[h].push(data); 
    })
    const uuidv4 = require('uuid').v4;



    function createUser({name = ""} = {}){
        return {
            id: uuidv4(), 
            name, 
            contacts: [] 
        }
    }
    
    function updateId(user) {
        connectedUsers.users[user.name]["socketId"] = user.id;
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