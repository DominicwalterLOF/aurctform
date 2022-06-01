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


function addCard(msg, name, roll, year, mail, no) {
    var x = '<div class="item"><div class="left"><div class="condensed bb">' + name + '</div><div class="condensed">' + year + '</div><div class="condensed">' + roll + '</div><div class="condensed">' + no + '</div></div><div class="right"><div class= "rtop">' + msg + '</div><div class = "rbottom">' + mail + '</div></div></div>';
    document.getElementById("MainCont").innerHTML += x;
}


function readData() {
    document.getElementById("MainCont").innerHTML = "";
    firebase.database().ref('messages/').on('value', (snap) => {
        renderHTML(snap.val());
    })
}

function renderHTML(values) {
    for (var i in values) {
        addCard(values[i]["message"], values[i]["name"], values[i]["regno"], values[i]["year"], values[i]["mail"], values[i]["phone"]);
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
        userdata = user;
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

dragElement(document.getElementById("chat"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
     
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
     
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
      
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
  
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
 
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
   
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

$(window).load(function() {
  //$messages.mCustomScrollbar();
  setTimeout(function() {
  }, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
 });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}


function submitMsg(inpMsg){
    var da = new Date();
    var dp1 = firebase.database().ref("Chatmessages/" + da.getTime()).set({
        value : inpMsg,
        nam : userdata.email.split("@")[0]
    }
    );
}

function readChatData() {
    
    firebase.database().ref('Chatmessages/').on('value', (snap) => {
        renderChat(snap.val());
    })
}



function renderChat(chatvalue){
    console.log("Render Chat");
    document.getElementById("messagescontent").innerHTML = "";
    console.log(chatvalue);
    for (k in chatvalue){
        renderMessage(chatvalue[k]["value"], chatvalue[k]["nam"])
    }
}


function insertMessage() {
    console.log("Insert Message");
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  submitMsg(msg);
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})


function renderMessage(chatMsg, nam) {
    console.log("render Message");
    document.getElementById("messagescontent").innerHTML += '<div class="mymessage"><p class = "nam">'+ nam + '</p><br><p class = "msg">' + chatMsg + '</p></div>';
    //$('<div class="message new"><figure class="avatar"><img src="./src/logo.png" /></figure><p>'+ nam + '</p><br>' + chatMsg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
}

readChatData();