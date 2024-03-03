function registerUser() {


    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var pass = document.getElementById("pass").value;
    var email = document.getElementById("email").value;


    var msg = "fname=" + fname + "&lname=" + lname + "&email=" + email + "&pass=" + pass;
    var url = "registerUser.php";
    resp = function (response) {
        // console.log("register succesfull?");
        var registerSuccessful = JSON.parse(response).registerSuccessful;
        var info = JSON.parse(response).info; 
        if(JSON.parse(response).registerSuccessful){
            document.getElementById("register_inf_success").innerHTML = JSON.parse(response).info;
            document.getElementById("register_inf").innerHTML = "";
            setTimeout(function(){ window.location.href="login.html"; }, 1500);
        }else{
            document.getElementById("register_inf_success").innerHTML = "";
            document.getElementById("register_inf").innerHTML = JSON.parse(response).info;
        }
        // console.log(registerSuccessful);
        // console.log(info);
    }
    xmlhttpPost(url, msg, resp);
}

function xmlhttpPost(strURL, mess, respFunc) {
    var xmlHttpReq = false;
    var self = this;
    // Mozilla/Safari
    if (window.XMLHttpRequest) {
        self.xmlHttpReq = new XMLHttpRequest();
    }
    // IE
    else if (window.ActiveXObject) {
        self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }
    self.xmlHttpReq.onreadystatechange = function () {
        if (self.xmlHttpReq.readyState == 4) {
            // alert ( self.xmlHttpReq.status ) ;
            if (self.xmlHttpReq.status == 200) {
                // document.getElementById("data").innerHTML = http_request.responseText;
                respFunc(self.xmlHttpReq.responseText);
            }
            else if (self.xmlHttpReq.status == 401) {
                window.location.reload();
            }
        }
    }
    self.xmlHttpReq.open('POST', strURL);
    self.xmlHttpReq.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    self.xmlHttpReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // self.xmlHttpReq.setRequestHeader("Content-length", mess.length);
    self.xmlHttpReq.send(mess);
}

window.addEventListener("load", (event) => {
    // console.log("page is fully loaded");
    isUserLogged();
});