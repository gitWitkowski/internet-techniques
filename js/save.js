function saveSettings(){
    var sortType = document.getElementById("mySelect").options[document.getElementById("mySelect").selectedIndex].value;
    var numOfElements = document.getElementById("numOfElements").value;
    var delay = document.getElementById("delay").value;
    var element_color = document.getElementById("elem_color").value;
    var color1 = document.getElementById("color1").value;
    var color2 = document.getElementById("color2").value;
    var color3 = document.getElementById("color3").value;


    const data = {
        "sortType" : sortType,
        "numOfElements" : numOfElements,
        "delay" : delay,
        "element_color" : element_color,
        "color1" : color1,
        "color2" : color2,
        "color3" : color3
    };

    console.log(JSON.stringify(data));

    var msg = "data=" + encodeURIComponent(JSON.stringify(data)) ;
    var url = "saveSettings.php" ;
    resp = function (response) {
        console.log(response);
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