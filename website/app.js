var admin = require('firebase-admin');
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/client'));
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 4000;


var database = admin.database();
var userInfo = database.ref('userInfo');

io.on('connection', function(socket){
  socket.on('createUser', function(userID, _orgName) {
    userInfo.child(userID).update({orgName: _orgName});
  });
});

http.listen(port, function(){
  console.log('listening on 127.0.0.1/' + port.toString());
});
