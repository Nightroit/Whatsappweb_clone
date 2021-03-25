var app = require('express')(); 
var http = require("http").createServer(app); 
var socket = require('./SocketManager')

const port = process.env.PORT || 4000
var io = module.exports.io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
}); 

io.on('connection', socket)

http.listen(port, () => {
    console.log(`Server has started at ${port}`); 
})
