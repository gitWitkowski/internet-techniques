function logout(){
    var url = "logoutUser.php";
    resp = function (response) {
        // alert(response);
        window.location.reload();
    }
    xmlhttpPost(url, "", resp);
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
    // console.log("LOGOUT page is fully loaded");
    // isUserLogged();
});
