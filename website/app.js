var admin = require('firebase-admin');
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/client'));
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 4000;

function replaceAll(orig, toReplace, replaceWith) {
  var replaced = orig.replace(toReplace, replaceWith);
  while (replaced.includes(toReplace)) {
    replaced = replaced.replace(toReplace, replaceWith);
  }
  return replaced;
}

function getCoordinates(address) {
  address = replaceAll(address, ' ', '+');
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+' + address + '&key=AIzaSyB874rZyp7PmkKpMdfpbQfKXSSLEJwglvM';
  var unirest = require("unirest");
  var req = unirest("GET", url);
  return req;
}



var database = admin.database();
var userInfo = database.ref('userInfo');
var banks = database.ref('banks');

io.on('connection', function(socket){
  socket.on('createUser', function(userID, _orgName) {
    userInfo.child(userID).update({orgName: _orgName});
  });
  socket.on('getCoordinates', function(address) {
    var req = getCoordinates(address);
    req.end(function(res) {
      if (res.error) {console.log(res.error);}
      else {
        socket.emit('coordinatesRes', res.body.results[0].geometry.location);
      }
    });
  });
  socket.on('addFoodBank', function(userID, bank) {
    var update = {};
    update[bank.name] = bank;
    banks.child(userID).update(update);
  })
});

http.listen(port, function(){
  console.log('listening on 127.0.0.1/' + port.toString());
});
