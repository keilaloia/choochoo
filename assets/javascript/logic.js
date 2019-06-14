
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBTv9wYPcNsfaiRivl-uLYHOwr0eqm-owk",
    authDomain: "choochoo-9d281.firebaseapp.com",
    databaseURL: "https://choochoo-9d281.firebaseio.com",
    projectId: "choochoo-9d281",
    storageBucket: "choochoo-9d281.appspot.com",
    messagingSenderId: "925902517023",
    appId: "1:925902517023:web:62c5e432d65c7244"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();



// 2. Button for adding Employees
$("#add-employee-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#Train-Name").val().trim();
    var trainDest = $("#Destination").val().trim();
    var trainStart= $("#first-train").val().trim();
    var trainFreq = $("#frequency").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      dest: trainDest,
      start: trainStart,
      freq: trainFreq
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    alert("Train successfully Choo-Choo'd");
  
    // Clears all of the text-boxes
    $("#Train-Name").val("");
    $("#Destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var ltrainName = childSnapshot.val().name;
    var ltrainDest = childSnapshot.val().dest;
    var ltrainStart = childSnapshot.val().start;
    var ltrainFreq = childSnapshot.val().freq;
  
    //m = minutes
    //data 
    var con = moment(ltrainStart, "hh:mm");
    console.log(con);

    var diff = moment().diff(con, `m`)
    console.log(diff);


    var timeleft = ltrainFreq % diff;
    console.log(timeleft);

    var nextchoochoo = moment().add(timeleft, "m").format("hh:mm");
    // Create the new row
    //var newRow = $("<tr>").append(
      $("#tnh").append(`<Div>${ltrainName}`);
      $("#dh").append(`<Div>${ltrainDest}`);
      $("#fh").append(`<Div>${ltrainFreq}`);
      $("#nah").append(`<Div>${nextchoochoo}`);
      $("#mah").append(`<Div>${timeleft}`);

    //   $("<td>").text(ltrainDest);
    //   $("<td>").text(ltrainStart);
    //   $("<td>").text(ltrainFreq);
     // $("<td>").text(empRate),
     // $("<td>").text(empBilled)
    //);
  
    // Append the new row to the table
    //$("#train-table > tbody").append(newRow);
  });
  