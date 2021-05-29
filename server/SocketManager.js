var hasher = require('./utils/hash')
const io = require('./index.js')
const User = require('./models/user')
const Messages = require('./models/message')
let mainUser; 
let users = []; 
let onlineUsers = {}; 
let userMessages = [];
const { LOAD_PROFILE, 
        SEARCH_USER, 
        ADD_CONTACTS, 
        VERIFY_USER, 
        USER_CONNECTED, 
        LOGOUT, 
        COMMUNITY_CHAT, 
        DATA_REQ, 
        LOAD_MESSAGES, 
        UPDATE_DB, 
        SEND_MESSAG, 
        SOCKET_ID, 
        SEND_MESSAGE } = require('./constants/index');

const { hash } = require('bcrypt');

function socket(socket) {

    socket.on(VERIFY_USER, (nickname, callback) => {
        if(isUser(connectedUsers, nickname)) {
            callback({isUser: true, user: null})
        } else {
            callback({isUser: false, user: createUser({name: nickname})})
        }
    })

    // MAIN_CHAT SOCKET

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
         
            User.findOne({handle: e.handle}, (err, data) => {
                let hash = hasher(e.handle, e.target)               

                                if(!data.contacts.find(d => (e.target = d.handle))) {
                                    data.contacts.push({handle: e.target});
                                    data.save()
                                    Messages.findOne({key: hash}, (err, data) => {
                                        if(!data) {
                                            const newModel = new Messages({
                                                key: hash 
                                            })
                                            newModel.save(); 
                                        }
                                    })
                                }
                            })   
        })


        socket.on(LOAD_PROFILE, (name) => {
            User.findOne({handle: name}).then((user, err) => {
                let DB_DATA = {
                    handle: '', 
                    profile: {}
                }; 
                user.socketId = socket.id; 
                user.save()  
                    profile = {
                        handle: name,
                        contacts: [...user.contacts], 
                        socketId: user.socketId
                    }
                    DB_DATA.handle = name;
                    DB_DATA.profile = profile
                    onlineUsers[name]= socket.id
                    
                    socket.emit(LOAD_PROFILE, profile); 
                    user.contacts.map(e => {
                        let hash = hasher(e.handle, name)
                        Messages.findOne({key: hash}, (err, data) => {
                            userMessages.push(data);
                                rel_data = {
                                    handle: e.handle, 
                                    messages: data.messages
                                }
                        socket.emit(LOAD_MESSAGES, rel_data);
                        })
                    })
                    users.push(DB_DATA);
            })
        })


        socket.on(SEND_MESSAGE, (data) => {
            
            let key = hasher(data.sender, data.reciever);
            let user = userMessages.find((e) => e.key == key)
            user.messages.push(data); 
            user.save().then(e => {
               
            })
            let id = onlineUsers[data.reciever]
            let senderId = onlineUsers[data.sender]
            io.io.to(id).emit(SEND_MESSAGE, data);
            io.io.to(senderId).emit(SEND_MESSAGE, data);
             
        })

}

module.exports =  {socket}