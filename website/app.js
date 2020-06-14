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


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://food-bank-ai.firebaseio.com"
});

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
  socket.on('getFoodBanks', function(userID) {
    banks.child(userID).once('value', function(snapshot) {
      socket.emit('foodBankRes', snapshot.val());
    })
  })
  socket.on('getFoodBank', function(userID, bankName) {
    console.log(userID);
    banks.child(userID).once('value', function(snapshot) {
      socket.emit('foodBankIndRes', snapshot.val()[bankName]);
    })
  })

  socket.on('find ingredients', function(ing) {
    var newP = searchIngredients(ing);
    newP.end(function(res) {
      if (res.error) {console.log(res.error);}
      socket.emit('ingredientsRes', res.body);
    });
  })

  })
  socket.on('addFood', function(userID, bank, food) {
    var update = {};
    update[food.name] = food;
    banks.child(userID).child(bank).child('food').update(update);
  })
  socket.on('getFood', function(userID, bank) {
    banks.child(userID).child(bank).child('food').once('value', function(snapshot) {
      if (snapshot.val() !== null) {
        socket.emit('foodRes', snapshot.val());
      }
    })
  })
  socket.on('changeQtyAndUnit', function(userID, bank, foodname, newQty, newUnit) {
    banks.child(userID).child(bank).child('food').child(foodname).update({
      quantity: newQty,
      unit: newUnit
    })
  });
});

http.listen(port, function(){
  console.log('listening on 127.0.0.1/' + port.toString());
});
