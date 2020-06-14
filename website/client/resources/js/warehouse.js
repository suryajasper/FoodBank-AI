var socket = io();

var userID;

initializeFirebase();

document.getElementById('addFood').onclick = function(e) {
  e.preventDefault();
  document.getElementById('popup').style.display = 'block';
}

document.getElementById('search').onclick = function(e) {
  $('#choiceDiv').empty();
  e.preventDefault();
  var foodIn = document.getElementById('food_name');
  if (foodIn.value.substring(0, 1) == '/') {
    socket.emit('findmultingredients', foodIn.value.substring(1).split(','));
    socket.on('ingredientsArrRes', function(foods) {
      document.getElementById('popup').style.display = 'none';
      console.log(foods);
      for (var food of foods) {
        food.quantity = 1;
        addFoodToWarehouse(food);
      }
    })
  } else {
    socket.emit('find ingredients', foodIn.value);
    socket.on('ingredientsRes', function(choices) {
      console.log(choices);
      for (var choice of choices) (function(choice) {
        var div = document.createElement('div');
        div.style.width = '100%';
        div.style.border = '2px solid black';
        div.style.margin = '0px';
        div.style.backgroundColor = 'rgb(133, 133, 133)';

        var img = document.createElement('img');
        img.src = 'https://spoonacular.com/cdn/ingredients_100x100/' + choice.image;
        img.style.display = 'inline-block';
        img.style.width = '40px';
        img.style.height = '40px';
        img.style.margin = '0px';
        img.style.marginTop = '5px';
        div.appendChild(img);

        var title = document.createElement('p');
        title.innerHTML = choice.name;
        title.style.fontSize = '20px';
        title.style.marginBottom = '0px';
        title.style.marginTop = '0px';
        title.style.display = 'inline-block';
        div.appendChild(title);

        var addButton = document.createElement('input');
        addButton.classList.add('addbutton');
        addButton.style.display = 'inline-block';
        addButton.type='button';
        addButton.value = 'Add';
        addButton.style.height = '40px';
        addButton.style.fontSize = '24px';
        addButton.style.marginBottom = '0px';
        addButton.style.marginTop = '5px';
        addButton.style.float = 'right';
        addButton.onclick = function(e) {
          e.preventDefault();
          document.getElementById('popup').style.display = 'none';
          console.log(choice.name);
          addFoodToWarehouse(choice);
        }
        div.appendChild(addButton);

        document.getElementById('choiceDiv').appendChild(div);

      })(choice);
    })
  }
}

var map;

function initMap(locs, infos) {
  map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: locs[0]});
  var iw = new google.maps.InfoWindow();
  for (var i = 0; i < locs.length; i++) {
    var marker = new google.maps.Marker({position: locs[i], map: map});
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        iw.setContent(infos[i]);
        iw.open(map, marker);
      }
    })(marker, i));
    google.maps.event.addListener(marker, 'dblclick', (function(marker, i) {
      return function() {
        window.location.href = 'viewfoodbank.html?' + infos[i];
      }
    })(marker, i));
  }
}
function addMarker(locaton) {
  var marker = new google.maps.Marker({position: location, map: map});
}

function addFood(food) {
  var div = document.createElement('div');
  div.classList.add('bankFood');

  var img = document.createElement('img');
  img.src = 'https://spoonacular.com/cdn/ingredients_100x100/' +food.image;
  img.style.float = 'left';
  div.appendChild(img);

  var verticalAlignDiv = document.createElement('div');
  verticalAlignDiv.classList.add('vertical');
  verticalAlignDiv.style.float = 'left';

  var title = document.createElement('p');
  title.innerHTML = food.name;
  verticalAlignDiv.appendChild(title);

  var verticalAlignDiv1 = document.createElement('div');
  verticalAlignDiv1.classList.add('vertical');
  verticalAlignDiv1.style.float = 'right';

  var qty = document.createElement('p');
  qty.innerHTML = food.quantity;
  if ('unit' in food) {
    qty.innerHTML += ' ' + food.unit;
  } else {
    qty.innerHTML += ' ' + food.possibleUnits[0];
  }
  verticalAlignDiv1.appendChild(qty);

  div.appendChild(verticalAlignDiv);
  div.appendChild(verticalAlignDiv1);

  div.onclick = function() {
    $('#specpopupSelect').empty();
    document.getElementById('specpopup').style.display = 'block';
    var qtyIn = document.getElementById('qtyInput');
    var specpopupSelect = document.getElementById('specpopupSelect');
    qtyIn.value = food.quantity;
    for (var option of food.possibleUnits) {
      var newOption = document.createElement('option');
      newOption.innerHTML = option;
      newOption.value = option;
      specpopupSelect.appendChild(newOption);
    }
    if ('unit' in food) {
      specpopupSelect.value = food.unit;
    }
    document.getElementById('saveQtyChange').onclick = function(e) {
      e.preventDefault();
      socket.emit('changeQtyAndUnitWarehouse', userID, food.name, parseInt(qtyIn.value), specpopupSelect.value);
      document.getElementById('specpopup').style.display = 'none';
      socket.on('changed', function() {
        socket.emit('getFoodWarehouse', userID);
      })
    }
  }

  document.getElementById('foodDiv').appendChild(div);
}

socket.on('foodRes', function(foods) {
  console.log(foods);
  $('#foodDiv').empty();
  for (var key of Object.keys(foods)) (function(key) {
    var food = foods[key];
    addFood(food);
  })(key);
})

function addFoodToWarehouse(food) {
  food.quantity = 1;
  socket.emit('addFoodToWarehouse', userID, food);
  addFood(food);
}

var lengthOfArray;
var markers = [];
var markerinfos;

socket.on('coordinatesRes', function(loc) {
  console.log(loc);
  markers.push(loc);
  if (markers.length == lengthOfArray) {
    initMap(markers, markerinfos);
  }
});

firebase.auth().onAuthStateChanged(user => {
  userID = user.uid;
  socket.emit('getFoodWarehouse', userID);

  socket.emit('getFoodBanks', userID);
  socket.on('foodBankRes', function(banks) {
    markerinfos = Object.keys(banks);
    //initMap();
    lengthOfArray = Object.values(banks).length;
    for (var bank of Object.values(banks)) {
      socket.emit('getCoordinates', bank.address);
    }
  });
})
