const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const contactSchema = new Schema({
    username: String, 
    handle: String,
    socketId: String,  
})

module.exports = contactSchema; 