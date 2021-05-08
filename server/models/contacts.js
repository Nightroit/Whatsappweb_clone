const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const contactSchema = new Schema({
    handle: String,
    socketId: String,  
})

module.exports = contactSchema; 