const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const textMessage = new Schema({
    message: String, 
    time : { type : Date, default: Date.now },
    sender: String, 
    reciever: String, 
})

module.exports = textMessage;