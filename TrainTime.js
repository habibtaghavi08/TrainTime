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


var database = firebase.database()


// database.ref().on("child_added")

// moment is where is the auto date and time but needs to be formatted
var currentTime = moment();




// created an onClick button for submit
$("#submit").on("click", function () {
  alert("click")
  // variables that are inputs on the form
  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrainTime = $("#firstTrainTime").val().trim();
  var frequency = $("#frequency").val().trim();
  var nextArrival = moment(firstTrainTime, "HH:mm")
  nextArrival.add(frequency, "m")
  nextArrival.format("HH:mm");
  console.log(trainName, destination, firstTrainTime, frequency)
  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: nextArrival.format("HH:mm"),
    frequency: frequency


  })




})
database.ref().on("child_added", function (snapShot) {

  var tr = $("<tr>")
  var col1 = $("<td>").text(snapShot.val().trainName)
  var col2 = $("<td>").text(snapShot.val().destination)
  var col3 = $("<td>").text(snapShot.val().frequency)
  
  // Assumptions
  var tFrequency = snapShot.val().frequency;
  
  
  var firstTime = snapShot.val().firstTrainTime
  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);
  
  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);
  
  // Time apart (remainder) 0r frequency
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);
  
  // Minute Until Train arrives
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  
  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
  
  var col4 = $("<td>").text(snapShot.val().firstTrainTime)
  var col5 = $("<td>").text(tMinutesTillTrain)
 

  tr.append(col1, col2, col3, col4, col5)
  $("tbody").append(tr)
  // var col2=$("<td>")
})