const io = require('./index.js')
const User = require('./models/user')
const Messages = require('./models/message')
let mainUser; 
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
const hasher = require('./utils/hash')

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
            if(!mainUser.contacts.find(ele => ele.handle == e.target)) {
                mainUser.contacts.push({handle: e.target, socketId: e.socketId}) 
                mainUser.save().catch((err) => {
                    console.log(err); 
                }); 
            
                // Demo hashing function ------------------------------ 
                let hash = hasher(e.handle, e.target)
                // Demo hashing function ------------------------------
        
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


        socket.on(LOAD_PROFILE, (name) => {
            User.findOne({handle: name}).then((user, err) => {
                mainUser = user;    
                    data = {
                        contacts: [...user.contacts], 
                        socketId: user.socketId
                    }
                    console.log(data);
                    socket.emit(LOAD_PROFILE, data); 
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
            })
        })


        socket.on(SEND_MESSAGE, (data) => {
            let key = hasher(data.sender, data.reciever);
            // console.log(userMessages)
            let user = userMessages.find((e) => e.key == key)
            user.messages.push(data); 
            user.save()
            // console.log(socket.id);
            io.io.to(socket.id).emit(SEND_MESSAGE, data); 
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

    // socket.on(UPDATE_DB, (data) => {
    //     let s = data.sender, r = data.reciever; 
    //     if(s > r) h = s+r; 
    //     else h = r+s; 
 
    //     connectedUsers.messages[h].push(data); 
    // })
    // const uuidv4 = require('uuid').v4;
    // function createUser({name = ""} = {}){
    //     return {
    //         id: uuidv4(), 
    //         name, 
    //         contacts: [] 
    //     }
    // }
}

module.exports =  {socket}