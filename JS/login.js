function login () {
    var user, password

    user = document.getElementById("user").value;
    password = document.getElementById("password").value;
   
    if ( user =="Admin" && password == "123456"){
        window.location = "../index.html";
    } else {
        alert ("Datos inccorrectos, favor de inentar nuevamente")
    }
};