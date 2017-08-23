console.log("Hello World");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDEj5pVnkQr38EoOTHA-0uX5u0TfJO-WoE",
    authDomain: "testing-sakina.firebaseapp.com",
    databaseURL: "https://testing-sakina.firebaseio.com",
    projectId: "testing-sakina",
    storageBucket: "",
    messagingSenderId: "484303247887"
};
firebase.initializeApp(config);

var auth = firebase.auth();

var db = firebase.database();

// ================================================
// User signup
// ================================================


$(".signup").on("click", function (event) {

    event.preventDefault();

    var email = $("#email").val().trim();
    var password = $("#password").val().trim();

    var user = auth.createUserWithEmailAndPassword(email, password);

    user
        .then(function (userCreated) {
            console.log(userCreated)
            console.log("new user created")

            var ref = db.ref("users");

            var data = {
                email: userCreated.email,
                id: userCreated.uid
            };

            ref.push(data)

        })
        .catch(function (err) {
            alert(err.message)
            console.log("There was an error, try again")
        });

    console.log(email, password)

});

// ================================================
// Chat
// ================================================

auth.onAuthStateChanged(function(user) {
    // Once authenticated, instantiate Firechat with the logged in user
    if (user) {
        initChat(user);
    }
});

function initChat(user) {
    // Get a Firebase Database ref
    var chatRef = firebase.database().ref("chat");

    // Create a Firechat instance
    var chat = new FirechatUI(chatRef, document.getElementById("firechat-wrapper"));

    // Set the Firechat user
    chat.setUser(user.uid, user.user.email);
}