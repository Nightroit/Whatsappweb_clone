var app = require('express')(); 
var http = require("http").createServer(app); 
var socket = require('./SocketManager')
var {connectedUsers} = require('./SocketManager')
var bodyParser = require('body-parser')
var cors = require('cors'); 
const { MESSAGE_RECIEVED } = require('../client/src/utils/Events');
const port = process.env.PORT || 4000
var io = module.exports.io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
}); 

var BodyParser = bodyParser.json(); 
app.use(BodyParser); 
app.use(cors({
    origin: 'http://localhost:3000'
  }));
io.on('connection', socket.socket)

app.use("/loadmsg", (req, res) => {
    let users = req.body.users; 
    let name = req.body.name;
    let messages = {}; 
    let key = ''; 

    users.map(e => {
        if(e > name) {
            key = e + name
        } else {
            key = name + e
        }
        let msg = connectedUsers.messages[key];
        if(msg)
            messages[e] =msg;
        key = ''
    })
    // console.log(JSON.stringify(messages))
    res.send(JSON.stringify(messages));
})


http.listen(port, () => {
    console.log(`Server has started at ${port}`); 
})
