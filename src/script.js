function d(e){
    return document.getElementById(e);
}

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
  

function submit(){
    var da = new Date();
    var dp1 = firebase.database().ref("messages/" + da.getTime()).set({
        name: d("name").value,
        mail: d("mail").value,
        phone: d("phone").value,
        regno: d("regno").value,
        message: d("msg").value,
        dept : d("d").value,
        year : d("y").value
    }
    );
    window.alert("Successfully Submitted...");
    location.replace("http://auttvl.ac.in/");
}
