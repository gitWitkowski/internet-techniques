function loginUser(){

    var pass  = document.getElementById("pass").value ;
    var email  = document.getElementById("email").value ;

    if(pass=="" || email==""){
        document.getElementById("login_inf").innerHTML = "Uzupełnij wszystkie podane pola!";
        if(email!="")
            document.getElementById("pass").focus();
        else
            document.getElementById("email").focus();
        return;
    }

    var msg = "email="+email+"&pass="+pass;

    var url = "loginUser.php" ;

    resp = function (response) {
        // console.log("login succesfull?");
        var loginSuccessful = JSON.parse(response); 
        // console.log(loginSuccessful);
        if(loginSuccessful){
            // alert("Zalogowano pomyslnie!");
            window.location.href="index.html";
        }else{
            document.getElementById("login_inf").innerHTML = "Błędny login lub hasło!";
            document.getElementById("email").focus();
            // alert("Błędny login lub hasło");
        }
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
    self.xmlHttpReq.send(mess);
}  

window.addEventListener("load", (event) => {
    // console.log("page is fully loaded");
    isUserLogged();
});