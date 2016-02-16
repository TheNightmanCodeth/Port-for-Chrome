Firebase.enableLogging(true);
var f = new Firebase('https://porthole.firebaseio.com/');
var username = "";

function register() {

  //Get the input from user
  var emailVal = document.getElementById("email_input").value;
  var usernVal = document.getElementById("user_input").value;
  var passwVal = document.getElementById("passw_input").value;

  //Create user
  f.createUser({
    email    : emailVal,
    password : passwVal
  }, function(error, userData) {
      if (error) {
        console.log("Error creating user: " +error);
      } else {
        console.log("Successfully created user account with uid: " +userData.uid);
        username = usernVal;
        login(emailVal, passwVal, usernVal);
      }
  });

}

function writeLink(usern, link) {
  console.log("writing link to firebase");
  var portRef = f.child("ports");
  portRef.child(usern).update({
    link: link
  });
}

function login(email, pass, usern) {
  console.log("test");
  f.authWithPassword({
    email    : email,
    password : pass
  }, function(error, authData) {
      if (error) {
        console.log("Login failed: " +error);
      } else {
        console.log("Logged in: " +authData);
        writeLink(usern, "https://www.reddit.com/r/trees/");
      }
  }, {
    remember: "sessionOnly"
  });
}

document.getElementById("submit_button").addEventListener("click", function() {
  register();
});
