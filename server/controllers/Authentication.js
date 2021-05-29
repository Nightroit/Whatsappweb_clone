const { v4: uuidv4 } = require('uuid');

const jwt = require('jwt-simple'); 
const User = require('../models/user')
const config = require('../config.js')

function tokenForUser(user) {
    const timestamp = new Date().getTime(); 
    return jwt.encode({ sub: user.id, iat: timestamp}, config.secret); 
}

exports.signin = function(req, res, next) {
    let error = [];
    const email = req.body.email; 
    const password = req.body.password; 
    
    if(!email) 
        error.push("User field cannot be empty") 
    if(!password) 
        error.push('Password field cannot be empty'); 
    if(error.length!=0) {
            return res.send(200).send(error)
    }
    User.findOne({email: email}, function(err, user) {
        if(err) {
            next(error); 
        }
        if(user) {
        
            return res.json({token: tokenForUser(user), handle: user['handle'], socketId: user.socketId})
        } 
        return res.json({error: "No such user exists!" }); 
    })
}

exports.signup = function(req, res, next) {
    const email = req.body.email; 
    const password = req.body.password; 
    const handle = req.body.handle; 
    let error = [];
    if(!handle) 
        error.push("Handle field cannot be empty"); 
    if(!email) 
        error.push("User field cannot be empty"); 
    if(!password) 
        error.push('Password field cannot be empty'); 
    if(error.length!=0)
        res.status(200).send(error);
    User.findOne({email: email}, function(err, existingUser) {
        if(err) {
            return next(err); 
        }
        if(existingUser) {  
            return res.status(422).send({error: 'Email is in use'}); 
        }
        User.findOne({handle: handle}, function(err, user) {
            if(err) 
                return next(err); 
            if(user) 
                return res.status(422).send({error: 'Handle is in use'})
        })
        const user = new User({
            email: email, 
            password: password, 
            handle: handle, 
            socketId: uuidv4()
        })
        
        user.save(function(err) {
            if(err) {return next(err)}  
            res.json({token: tokenForUser(user), handle: handle});
        }); 
    })
}