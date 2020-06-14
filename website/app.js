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


function searchIngredients(ingredient) {
  var unirest = require("unirest");

  var req = unirest("GET", "https://api.spoonacular.com/food/ingredients/autocomplete?query=" + ingredient + "&number=7&metaInformation=true");

  req.query({
    "defaultCss": true
  });

  return req;
}

function getHomelessShelters(location, radius) {
  var unirest = require("unirest");

  var req = unirest("GET", "https://maps.googleapis.com/maps/api/place/textsearch/json");

  req.query({
    "key": "AIzaSyB874rZyp7PmkKpMdfpbQfKXSSLEJwglvM",
    "query": "homeless shelters",
    "location": location.lat.toString() + ',' + location.lng.toString(),
    "radius": radius.toString()
  });

  return req;
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
var warehouse = database.ref('warehouse');
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

  socket.on('addFoodToWarehouse', function(userID, food) {
    var update = {};
    update[food.name] = food;
    warehouse.child(userID).update(update);
  })
  socket.on('getFoodWarehouse', function(userID, bank) {
    warehouse.child(userID).once('value', function(snapshot) {
      if (snapshot.val() !== null) {
        socket.emit('foodRes', snapshot.val());
      }
    })
  })
  socket.on('changeQtyAndUnitWarehouse', function(userID, foodname, newQty, newUnit) {
    warehouse.child(userID).child(foodname).update({
      quantity: newQty,
      unit: newUnit
    })
  });

  socket.on('findHomelessShelter', function(location, radius) {
    var promise = getHomelessShelters(location, radius);
    promise.end(function(res) {
      if (res.error) {console.log(res.error);}
      else {
        socket.emit('foundHomelessShelters', res.body.results);
      }
    })
  })

  socket.on('convertIngs', function(ings) {
    var unirest = require('unirest');
    var results = ings.map(function(ingredient) {
      return new Promise(function(resolve, reject) {
        var req = unirest("GET", 'https://api.spoonacular.com/recipes/convert');
        var unit = ('unit' in ingredient) ? ingredient.unit: ingredient.possibleUnits[0];
        console.log(unit);

        req.query({
          "apiKey": "bc240f5675d94b39b9a096f5a949a9d7",
          "ingredientName": ingredient.name,
          "sourceAmount": ingredient.quantity,
          "sourceUnit": unit,
          "targetUnit": 'oz'
        });

        req.end(function(data) {
          resolve(data);
        });

        return req;
      });
    });
    Promise.all(results).then(function(result) {
      var total = 0;
      var content = result.map(function(ing) {
        console.log(parseFloat(ing.body.targetAmount) * 1.80469);
        total += parseFloat(ing.body.targetAmount) * 1.80469;
        return ing.body;
      });
      console.log(total);
      socket.emit('totalSpace', total);
    });
  })
});

http.listen(port, function(){
  console.log('listening on 127.0.0.1/' + port.toString());
});
