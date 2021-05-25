var app = require('express')(); 
var http = require("http")
const server = http.createServer(app);

const passport = require('passport')
require('./services/passport')
const router = require('./routes/router'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 
const bodyParser = require('body-parser'); 
const morgan = require('morgan'); 
const port = process.env.PORT || 3090

app.use(cors({
    origin: 'http://localhost:3000'
  }));

// Socket thing - start
var socket = require('./SocketManager')
var io = module.exports.io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000"
    }
}); 



io.on('connection', socket.socket)
// Socket thing - end


mongoose.connect('mongodb+srv://nightroit:nightroit_lol223225@cluster0.jzfxr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(() => {
    console.log('connected!'); 
}); 

// App setup
app.use(morgan('combined'));

app.use(bodyParser.json({ type: '*/*'})); 
router(app); 
// Server setup 



server.listen(port, () => {
    console.log(`Server has started at ${port}`); 
})
