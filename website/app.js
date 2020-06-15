var admin = require('firebase-admin');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static(__dirname + '/client'));
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
	next();
});
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

function getCalories(ingredient) {
  var unirest = require('unirest');
  var req = unirest("GET", 'https://api.spoonacular.com/recipes/convert');
  var unit = ('unit' in ingredient) ? ingredient.unit: ingredient.possibleUnits[0];

  req.query({
    "apiKey": "bc240f5675d94b39b9a096f5a949a9d7",
    "ingredientName": ingredient.name,
    "sourceAmount": ingredient.quantity,
    "sourceUnit": unit,
    "targetUnit": 'oz'
  });

  return req;
}

function getCaloriesByParam(name, quantity, unit) {
  var unirest = require('unirest');
  var req = unirest("GET", 'https://api.spoonacular.com/recipes/convert');

  req.query({
    "apiKey": "bc240f5675d94b39b9a096f5a949a9d7",
    "ingredientName": name,
    "sourceAmount": quantity,
    "sourceUnit": unit,
    "targetUnit": 'oz'
  });

  return req;
}

function ingredientInfo(ing) {
  var req = unirest('GET', 'https://api.spoonacular.com/food/ingredients/'+ ing.id.toString() +'/information');
  var unit = ('unit' in ing) ? ing.unit: ing.possibleUnits[0];

  req.query({
    'apiKey': "bc240f5675d94b39b9a096f5a949a9d7",
    'amount': ing.quantity,
    'unit': unit
  })

  return req;
}

function searchIngredients(ingredient) {
  var unirest = require("unirest");

  var req = unirest("GET", "https://api.spoonacular.com/food/ingredients/autocomplete?query=" + ingredient + "&number=7&metaInformation=true");

  req.query({
    "apiKey": "bc240f5675d94b39b9a096f5a949a9d7",
    "defaultCss": true
  });

  return req;
}

function getHomelessShelters(location, radius) {
  //console.log(location);
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
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyB874rZyp7PmkKpMdfpbQfKXSSLEJwglvM';
  var unirest = require("unirest");
  var req = unirest("GET", url);
  return req;
}

var serviceAccount = require("/Users/suryajasper2004/Downloads/food-bank-ai-service-account.json");
var calMultiplier = 32;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://food-bank-ai.firebaseio.com"
});

var database = admin.database();
var userInfo = database.ref('userInfo');
var warehouse = database.ref('warehouse');
var banks = database.ref('banks');
var homelessPref = database.ref('preferences');

function sendToAI() {
  var unirest = require('unirest');

  var req = unirest("GET", 'aifoodbank.suryajasper.com/dividefood');

  req.end(function(res) {
    var foodbanks = res.body;
    warehouse.child('wQVmzq74oNMdTleSKiQW9TbbVWh2').once('value', function(snapshot) {
      for (var bankName of Object.keys(foodbanks)) {
        banks.child('wQVmzq74oNMdTleSKiQW9TbbVWh2').child(bankName).once('value', function(bankSnapshot) {
          for (var foodName of Object.keys(foodbanks[bankName])) {
            warehouse.child('wQVmzq74oNMdTleSKiQW9TbbVWh2').child(foodName).update({
              quantity: Math.min(snapshot.val()[bankName][foodName].quantity-foodbanks[bankName][foodName], 0)
            });
            if (foodName in bankSnapshot.val()) {
              banks.child('wQVmzq74oNMdTleSKiQW9TbbVWh2').child(bankName).child('foods').child(foodName).update({
                quantity: parseInt(bank.snapshot.val()[foodName].quantity) + foodbanks[bankName][foodName]
              })
            } else {
              var update = {};
              update[foodName] = snapshot.val()[foodName];
              banks.child('wQVmzq74oNMdTleSKiQW9TbbVWh2').child(bankName).child('foods').update(update);
            }
          }
        });
      }
    })
  });
}

app.get('/warehouse', async function(req, res) {
  warehouse.child('wQVmzq74oNMdTleSKiQW9TbbVWh2').once('value', function(snapshot) {
    res.status(200);
  	res.json(snapshot.val());
  	res.end();
  })
});

app.get('/shelters', async function(req, res) {
  banks.child('wQVmzq74oNMdTleSKiQW9TbbVWh2').once('value', function(snapshot) {
    var homelessArr = [];
    for (var bank of Object.values(snapshot.val())) {
      if ('shelters' in bank) {
        for (var shelter of Object.values(bank.shelters)) {
          var newShelter = {position: shelter.geometry.location, address: shelter.formatted_address, name: shelter.name};
          homelessArr.push(newShelter);
        }
      }
    }
    res.status(200);
  	res.json(homelessArr);
  	res.end();
  })
});

app.post('/preferences', async function (req, res) {
  homelessPref.once('value', function(snapshot) {
    var ind = (snapshot.val() == null) ? 0 : Object.keys(snapshot.val()).length;
    homelessPref.child(ind).set({
      calories: req.body.calories,
      choices: req.body.foods,
      shelter: req.body.shelter
    })
  })
  res.status(200);
  res.end();
})

app.get('/preferences', async function (req, res) {
  homelessPref.once('value', function(snapshot) {
    var ind = (snapshot.val() == null) ? 0 : Object.keys(snapshot.val()).length;
    homelessPref.child(ind).set({
      calories: req.body.calories,
      choices: req.body.foods,
      shelter: req.body.shelter
    })
  })
  res.status(200);
  res.end();
})

app.get('/banks', async function(req, res) {
  banks.child('wQVmzq74oNMdTleSKiQW9TbbVWh2').once('value', function(snapshot) {
    res.status(200);
    var toReturn = {};
    var allBanks = snapshot.val();
    for (var bank of Object.keys(allBanks)) {
      delete allBanks[bank]['thumbnail'];
      toReturn[bank] = allBanks[bank];
    }
    res.json(toReturn);
  	res.end();
  })
});

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

  socket.on('findmultingredients', function(ings) {
    var unirest = require("unirest");
    var results = ings.map(function(ingredient) {
      return new Promise(function(resolve, reject) {
        var req = unirest("GET", "https://api.spoonacular.com/food/ingredients/autocomplete?query=" + ingredient + "&number=1&metaInformation=true&apiKey=bc240f5675d94b39b9a096f5a949a9d7&defaultCss=true");
        req.end(function(res) { resolve(res); });
        return req;
      });
    });
    Promise.all(results).then(function(result) {
      var foodsToSend = [];
      var content = result.map(function(ing) {
        if (ing.body.length > 0) {
          foodsToSend.push(ing.body[0]);
        }
        return ing.body;
      });
      socket.emit('ingredientsArrRes', foodsToSend)
    });
  })
  socket.on('addFood', function(userID, bank, food) {
    var toCalPromise = getCalories(food);
    toCalPromise.end(function(res) {
      food.calories = parseFloat(res.body.targetAmount) * calMultiplier;
      console.log(food);
      var update = {};
      update[food.name] = food;
      banks.child(userID).child(bank).child('food').update(update);
    });
  })
  socket.on('getFood', function(userID, bank) {
    banks.child(userID).child(bank).child('food').once('value', function(snapshot) {
      if (snapshot.val() !== null) {
        socket.emit('foodRes', snapshot.val());
      }
    })
  })
  socket.on('changeQtyAndUnit', function(userID, bank, foodname, newQty, newUnit) {
    var toCalPromise = getCaloriesByParam(foodname, newQty, newUnit);
    toCalPromise.end(function(res) {
      banks.child(userID).child(bank).child('food').child(foodname).update({
        quantity: newQty,
        unit: newUnit,
        calories: parseFloat(res.body.targetAmount) * calMultiplier
      });
      socket.emit('changed');
    });
  });

  socket.on('addFoodToWarehouse', function(userID, food) {
    var toCalPromise = getCalories(food);
    toCalPromise.end(function(res) {
      console.log(res.body);
      var update = {};
      food.calories = parseFloat(res.body.targetAmount) * calMultiplier;
      update[food.name] = food;
      warehouse.child(userID).update(update);
      socket.emit('ready to click');
    })
  })
  socket.on('getFoodWarehouse', function(userID, bank) {
    warehouse.child(userID).once('value', function(snapshot) {
      if (snapshot.val() !== null) {
        socket.emit('foodRes', snapshot.val());
      }
    })
  })
  socket.on('changeQtyAndUnitWarehouse', function(userID, foodname, newQty, newUnit) {
    var toCalPromise = getCaloriesByParam(foodname, newQty, newUnit);
    toCalPromise.end(function(res) {
      warehouse.child(userID).child(foodname).update({
        quantity: newQty,
        unit: newUnit,
        calories: parseFloat(res.body.targetAmount) * calMultiplier
      });
      socket.emit('changed');
    });
  });

  socket.on('findHomelessShelter', function(userID, bankName, radius) {
    banks.child(userID).child(bankName).once('value', function(snapshot) {
      var bank = snapshot.val();
      if ('shelters' in bank) {
        socket.emit('foundHomelessShelters', bank.shelters);
      } else {
        var coordPromise = getCoordinates(bank.address);
        coordPromise.end(function(location) {
          var promise = getHomelessShelters(location.body.results[0].geometry.location, radius);
          promise.end(function(res) {
            if (res.error) {console.log(res.error);}
            else {
              socket.emit('foundHomelessShelters', res.body.results);
              banks.child(userID).child(bankName).update({shelters: res.body.results});
            }
          })
        })
      }
    });
  })

  socket.on('convertIngs', function(ings) {
    var unirest = require('unirest');
    var results = ings.map(function(ingredient) {
      return new Promise(function(resolve, reject) {
        var req = unirest("GET", 'https://api.spoonacular.com/recipes/convert');
        var unit = ('unit' in ingredient) ? ingredient.unit: ingredient.possibleUnits[0];

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
        total += parseFloat(ing.body.targetAmount) * 1.80469;
        return ing.body;
      });
      socket.emit('totalSpace', total);
    });
  })
  socket.on('getRequests', function() {
    var requests = {};
    homelessPref.once('value', function(snapshot) {
      for (var person of Object.values(snapshot.val())) {
        for (var choice of person.choices) {
          if (choice in requests) {
            requests[choice] += 1;
          } else {
            requests[choice] = 1;
          }
        }
      }
      socket.emit('requestRes', requests);
    });
  })
  socket.on('deliver', function(userID) {
    homelessPref.once('value', function(snapshot) {
      var preferences = snapshot.val();
      for (var preference of preferences) {
        banks.child(userID).once('value', function(snapshot) {
          for (var bank of Object.keys(snapshot.val())) {
            if (preference.shelter in snapshot.val()[bank].shelters) {
              for (var food of preference.foods) {
                var newQty = snapshot.val()[bank].food[food].quantity - 1;
                if (newQty > 0) {
                  bank.child(userID).child(bank).child('food').child(food).update({quantity: newQty});
                } else {
                  bank.child(userID).child(bank).child('food').child(food).remove();
                }
              }
              break;
            }
          }
        });
      }
    })
  })
});

http.listen(port, function(){
  console.log('listening on 127.0.0.1/' + port.toString());
});
