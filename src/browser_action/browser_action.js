Firebase.enableLogging(true);
var f = new Firebase('https://porthole.firebaseio.com/');
var username = "";

function register() {
  //Get the input from user
  var emailVal = document.getElementById("email_input").value;
  var passwVal = document.getElementById("passw_input").value;

  //Login user
  login(emailVal, passwVal);
}

function writeLink(usern, link) {
  console.log("writing link to firebase");
  var portRef = f.child("ports");

  portRef.child(usern).update({
    link: link
  });
}

function login(email, pass) {
  f.authWithPassword({
    email    : email,
    password : pass
  }, function(error, authData) {
      if (error) {
        console.log("Login failed: " +error);
      } else {
        console.log("Logged in: " +authData);
        var url = null;
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs) {
          url = tabs[0].url;
          var uid = authData.uid;
          //TODO: Get username from firebase
          console.log("UDI: " +uid);
          writeLink(username, url);
        });
      }
  }, {
    remember: "sessionOnly"
  });
}

document.getElementById("submit_button").addEventListener("click", function() {
  register();
});
