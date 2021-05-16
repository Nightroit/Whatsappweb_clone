const io = require('./index.js')
const User = require('./models/user')
const Messages = require('./models/message')
let mainUser; 
const { LOAD_PROFILE, SEARCH_USER, ADD_CONTACTS, VERIFY_USER, USER_CONNECTED, LOGOUT, COMMUNITY_CHAT, DATA_REQ, LOAD_MESSAGES, UPDATE_DB } = require('./constants/index');
const { Socket } = require('socket.io');


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
            {msg: "Hi, Shivam", reciever: "Shivam", sender: "Divyank", messageId: 2}], 
        "ShivamDhurba": [
            {msg: "Hi, Dhurba", reciever: "Dhurba", sender: "Shivam", messageId: 1},
            {msg: "Hi, Shivam", reciever: "Shivam", sender: "Dhurba", messageId: 2}]
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
        User.findOne({handle: name}).then((user, err) => {
            mainUser = user; 
            if(user) {
                user.socketId = socket.id
                user.save()
            }
        })  
    })
    socket.on(SEARCH_USER, (handle, fn) => {
        User.find({handle: handle}, (err, user) => {
            let rel = []; 
            user.map(e => {
                rel.push({handle: e.handle, socketId: e.socketId})
            })
            fn(rel)
        })
    })

    socket.on(ADD_CONTACTS, (e) => {
        if(!mainUser.contacts.find(ele => ele.handle == e.target)) {
            mainUser.contacts.push({handle: e.target}) 
            mainUser.save().catch((err) => {
                console.log(err); 
            }); 
        }
        console.log(e); 
    })

    socket.on(LOAD_PROFILE, (name) => {
        User.findOne({handle: name}).then((user, err) => {
            mainUser = user;    
            data = {
                contacts: [...user.contacts], 
                socketId: socket.id
            }
            user.socketId = socket.id; 
            user.save().then(() => {
                socket.emit(LOAD_PROFILE, data); 
                user.contacts.map(e => {
                    if(e.handle < name) handle1 = e.handle
                    else handle1 = name; 
                    console.log(handle1)
                    Messages.findOne({handle1: handle1}, (err, data) => {
                        data = {
                            handle: e.handle, 
                            messages: data.messages
                        }
                        socket.emit(LOAD_MESSAGES, {data});
                    })
                })
            })
        })
        // console.log(mainUser)
        // User.findOne({handle: name}).then((user, err) => {
        //     Message.findOne({name}).then(user => {

        //     })
        //     if(user) { 
        //         let data = {
        //             handle: user.handle, 
        //             contacts: user.contacts, 
        //             message: []
        //         }
        //         socket.emit(DATA_REQ, data)
        //     }
        //     else socket.emit(DATA_REQ, err) 
        // })       

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
}

module.exports =  {connectedUsers, socket}