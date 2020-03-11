// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCvKrK3H6VtvrQqJmGAJKmNbHVk2fLWGFM",
    authDomain: "traintime-5f049.firebaseapp.com",
    databaseURL: "https://traintime-5f049.firebaseio.com",
    projectId: "traintime-5f049",
    storageBucket: "traintime-5f049.appspot.com",
    messagingSenderId: "315289793232",
    appId: "1:315289793232:web:2eb3d34ddacda42da924d5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  var database=firebase.database()

  database.ref().push({
      name:"Habib"
  })