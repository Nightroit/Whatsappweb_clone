const Authentication = require('./controllers/Authentication');
const passport = require('passport'); 
var {connectedUsers} = require('./SocketManager')
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
    app.post("/loadmsg", (req, res) => {
        let users = req.body.users; 
        let name = req.body.name;
        let messages = {}; 
        let key = ''; 
    
        users.map(e => {
            if(e > name) {
                key = e + name
            } else {
                key = name + e
            }
            let msg = connectedUsers.messages[key];
            if(msg)
                messages[e] =msg;
            key = ''
        })
        res.send(JSON.stringify(messages));
    })
}