const io = require('./index.js')
const User = require('./models/user')
const Messages = require('./models/message')
let mainUser; 
let users = []; 
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
            // console.log(users)
            let bool = users.find((e) => {return e.handle === name})
            console.log(bool)
            if(bool) {
                socket.emit(LOAD_PROFILE, bool.profile); 
                bool.messages.map((e) => {
                    socket.emit(LOAD_MESSAGES, e)
                });
            } else {
            User.findOne({handle: name}).then((user, err) => {
                let DB_DATA = {
                    handle: '', 
                    profile: {}, 
                    messages: []
                }; 
                user.socketId = socket.id; 
                user.save()
                mainUser = user;    
                    profile = {
                        contacts: [...user.contacts], 
                        socketId: user.socketId
                    }
                    DB_DATA.handle = name;
                    DB_DATA.profile = profile
    
                    socket.emit(LOAD_PROFILE, profile); 
                    user.contacts.map(e => {
                        let hash = hasher(e.handle, name)
                        Messages.findOne({key: hash}, (err, data) => {
                            userMessages.push(data);
                                rel_data = {
                                    handle: e.handle, 
                                    messages: data.messages
                                }
                                DB_DATA.messages.push(rel_data);
                        socket.emit(LOAD_MESSAGES, rel_data);
                    })
                })
                users.push(DB_DATA);
            })
            }
        })


        socket.on(SEND_MESSAGE, (data) => {
            let key = hasher(data.sender, data.reciever);
            console.log(data)
            let user = userMessages.find((e) => e.key == key)
            user.messages.push(data); 
            user.save()
            User.findOne({handle: data.reciever}, (err, data) => {
                io.io.to(data.socketId).emit(SEND_MESSAGE, data);
            })
            // console.log(socket.id);
             
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