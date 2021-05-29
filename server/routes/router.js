const Authentication = require('../controllers/Authentication');
const passport = require('passport'); 
const User = require('../models/user')
const Messages = require('../models/message')
require('../services/passport');
var {connectedUsers, socket} = require('../SocketManager')
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
}