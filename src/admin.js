const firebaseConfig = {
    apiKey: "AIzaSyATwNbj1P7vswYse50NcaoPrbpm9igNo_o",
    authDomain: "aubackend.firebaseapp.com",
    databaseURL: "https://aubackend-default-rtdb.firebaseio.com",
    projectId: "aubackend",
    storageBucket: "aubackend.appspot.com",
    messagingSenderId: "421467929274",
    appId: "1:421467929274:web:6aa69e37001ee259d6e083",
    measurementId: "G-9MWBHEN5NT"
};

firebase.initializeApp(firebaseConfig);

firebase.analytics();


const navTabs = document.querySelectorAll("#nav-tabs > a");
navTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        navTabs.forEach((tab) => {
            tab.classList.remove("active");
        });
        tab.classList.add("active");
    });
});


function addCard(msg, name, roll, year, mail){
    var x = '<div class="item"><div class="left"><div class="condensed bb">' + name +'</div><div class="condensed">' + year + '</div><div class="condensed">' + roll + '</div></div><div class="right"><p>' + msg +'</p></div></div>';
    document.getElementById("MainCont").innerHTML += x;
}


function readData(){
    firebase.database().ref('messages/').on('value', (snap) => {
        renderHTML(snap.val());
    })
}

function renderHTML(values){
    for (var i in values) {
        addCard(values[i]["message"], values[i]["name"], values[i]["regno"], values[i]["year"], values[i]["mail"]);
    }
}


function rem() {

    document.getElementById("frostOverlay").style.display = "none";

}

function sig() {
    googleSignInPopup();

}

var userdata;

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        readData();
        rem();
    } else {

    }
});

var provider1 = new firebase.auth.GoogleAuthProvider();

var credential;

function googleSignInPopup() {

    var provider1 = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider1).then((result) => {
        credential = result.credential;

        var token = credential.accessToken;
        var user = result.user;

    }).catch((error) => {
    });
}