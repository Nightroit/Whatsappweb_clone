const Authentication = require('../controllers/Authentication');
const passport = require('passport'); 
const User = require('../models/user')
require('../services/passport');
var {connectedUsers} = require('../SocketManager')
const requireAuth = passport.authenticate('jwt', {
    session: false
})
module.exports = function(app) {
    app.get('/', requireAuth, function(req, res) {
        res.send({hi: 'there'})
        console.log(req); 
    });
    app.post('/signin', Authentication.signin); 
    app.post('/signup', Authentication.signup)
    app.post('/load', passport.authenticate('jwt', {session : false}), (req, res, next) => {
        let handle = req.handle; 
        User.findOne(handle, (err, user) => {
            console.log(err)
            if(user) {
                data = {
                    contacts: [...user.contacts], 
                    socketId: user.socketId
                }
                user.contacts.map(e => {
                    console.log(e)
                })
            }
        })
    })
}