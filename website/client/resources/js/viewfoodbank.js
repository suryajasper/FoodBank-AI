var socket = io();

var userID;
var foodBank = window.location.href.split('?')[1];

document.getElementById('bankName').innerHTML = foodBank;

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
        addFoodToBank(food);
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
          addFoodToBank(choice);
        }
        div.appendChild(addButton);

        document.getElementById('choiceDiv').appendChild(div);

      })(choice);
    })
  }
}

function initMap(location) {
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: location});
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
      socket.emit('changeQtyAndUnit', userID, foodBank, food.name, parseInt(qtyIn.value), specpopupSelect.value);
      document.getElementById('specpopup').style.display = 'none';
      socket.emit('getFood', userID, foodBank);
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

function addFoodToBank(food) {
  food.quantity = 1;
  socket.emit('addFood', userID, foodBank, food);
  addFood(food);
}

function createHomelessShelters(res) {
  for (var shelter of res) {
    var li = document.createElement('li');
    li.innerHTML = shelter.name + ' <span style = "color: rgb(63, 149, 79)">(' + shelter.formatted_address + ')</span>';
    document.getElementById('shelterDiv').appendChild(li);
  }
}

firebase.auth().onAuthStateChanged(user => {
  userID = user.uid;
  socket.emit('getFood', userID, foodBank);
  socket.emit('getFoodBank', userID, foodBank);
  socket.on('foodBankIndRes', function(bank) {
    console.log(bank);
    document.getElementById('address').innerHTML = 'Address: ' + bank.address;
    socket.emit('getCoordinates', bank.address);
    socket.on('coordinatesRes', function(loc) {
      initMap(loc);
      socket.emit('findHomelessShelter', loc, 10000);
      socket.on('foundHomelessShelters', createHomelessShelters);
    });
  })
})
