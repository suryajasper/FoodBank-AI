function initializeFirebase() {
  var firebaseConfig = {
    apiKey: "AIzaSyBdj7jiYl28oux5HSy4qa14HTy2z7Ie0SI",
    authDomain: "food-bank-ai.firebaseapp.com",
    databaseURL: "https://food-bank-ai.firebaseio.com",
    projectId: "food-bank-ai",
    storageBucket: "food-bank-ai.appspot.com",
    messagingSenderId: "68161453054",
    appId: "1:68161453054:web:1e37cf6513f8478c835eaf",
    measurementId: "G-V79D6Y8L1M"
  };
  firebase.initializeApp(firebaseConfig);
}
