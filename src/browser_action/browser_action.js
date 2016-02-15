Firebase.enableLogging(true);
var f = new Firebase('https://porthole.firebaseio.com/Ports');

f.authAnonymously(function(error, authData) {
  if (error) {
    console.log("Login failed" +error, error);
  } else {
    console.log("Authenticated successfully w payload:", authData);
  }
}, {
  remember: "sessionOnly"
});

f.transaction(function(curr) {
  if (isNaN(parseFloat(curr)))
    return 1; // initialize to 1.
  else
    return "Fuck police"; // increment.
}, function() {
    // Once the transaction has completed, update the UI (and watch for updates).
    f.on('value', function(s) {
      document.getElementById('contents').innerHTML = s.val();
    });
  });
