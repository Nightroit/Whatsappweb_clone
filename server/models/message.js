const mongoose = require('mongoose'); 
const textMessage = require('./textMessage');
const Schema = mongoose.Schema; 

const messageSchema = new Schema({
    handle1: String, 
    handle2: String, 
    messages: [textMessage],
    time : { type : Date, default: Date.now }
})

const ModelClass = mongoose.model('messages', messageSchema); 

module.exports = ModelClass; 