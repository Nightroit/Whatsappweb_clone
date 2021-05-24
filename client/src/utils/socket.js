const io = require('socket.io-client');


const URL = "http://localhost:3090";
const socket = io.connect(URL, {query: "CustomId= "+localStorage.getItem('socketId')});

export default socket;