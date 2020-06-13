var socket = io();

var popup = document.getElementById("popup");
var nameIn = document.getElementById("name");
var thumbIn = document.getElementById('thumbInput');
var foodbankDiv = document.getElementById('foodbankDiv');
var _maxStorage = document.getElementById('maxStorage');

var imageRaw;

initializeFirebase();

document.getElementById('addBank').onclick = function(e) {
  e.preventDefault();
  popup.style.display = "block";
}

function initMap(location) {
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: location});
  var marker = new google.maps.Marker({position: location, map: map});
}

document.getElementById('preview').onclick = function(e) {
  e.preventDefault();
  socket.emit('getCoordinates', document.getElementById('addressIn').value);
  socket.on('coordinatesRes', initMap);
}

document.getElementById('thumbInput').onchange = function(event) {
  var reader = new FileReader();
  reader.onload = function(){
    document.getElementById('thumbInLabel').innerHTML = "Image Selected";
    document.getElementById('thumbPreview').style.display = 'block';
    document.getElementById('thumbPreview').src = reader.result;
    imageRaw = reader.result;
    //serialized.thumbnail = reader.result;
  }
  reader.readAsDataURL(event.target.files[0]);
}

firebase.auth().onAuthStateChanged(user => {
  document.getElementById('addBankButton').onclick = function(e) {
    e.preventDefault();
    var data = {name: nameIn.value, thumbnail: imageRaw, maxStorage: parseInt(_maxStorage.value), address: document.getElementById('addressIn').value};
    socket.emit('addFoodBank', user.uid, data);
  }
})
