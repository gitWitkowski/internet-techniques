function isUserLogged(){
    var url = "checkIsUserLogged.php";
    resp = function (response) {
        console.log( JSON.parse(response) ) ;
        console.log(document.getElementById("nav-bar"));
        if(JSON.parse(response)){
            document.getElementById("nav-list").innerHTML = `
            <li><a href="#" onclick="logout()">Wyloguj się</a></li>
            <li><a href="index.html#opis">O projekcie</a></li>
            <li><a href="index.html">Strona główna</a></
            `;

            document.getElementById("settings").innerHTML = `
              <input type="button" id="save" onclick="saveSettings()"  value="Zapisz ustawienie" class="btn">
            <input type="button" id="apply" onclick="applySettings()"  value="Wczytaj ustawienie" class="btn">
            <select id="settingSelect" >
            </select>
            `;
            var url = "getSettings.php";
            resp2 = function(response){
                var data = JSON.parse(response);
                console.log(data);
                var select = document.getElementById("settingSelect");
                select.innerHTML = "";
                for(var i=0; i<data.length; i++){
                    select.innerHTML += `
                    <option value='${JSON.stringify(data[i])}'>
                        Ustawienie nr ${i+1}
                    </option>
                    `;
                }

            }
            xmlhttpPost(url, "", resp2);
        }else{
            document.getElementById("nav-list").innerHTML = `
            <li><a href="register.html">Zarejestruj się</a></li>
            <li><a href="login.html">Zaloguj się</a></li>
            <li><a href="index.html#opis">O projekcie</a></li>
            <li><a href="index.html">Strona główna</a></
            `;
        }
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
    self.xmlHttpReq.open('GET', strURL);
    self.xmlHttpReq.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    self.xmlHttpReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // self.xmlHttpReq.setRequestHeader("Content-length", mess.length);
    self.xmlHttpReq.send(mess);
}  

window.addEventListener("load", (event) => {
    // console.log("page is fully loaded");
    isUserLogged();
});