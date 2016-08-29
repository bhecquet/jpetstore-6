/*
 *    Copyright 2010-2016 the original author or authors.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */
function createRequest() {
	if (window.XMLHttpRequest) {
		
	    return new XMLHttpRequest();
    } else {
	    // code for IE6, IE5
	    return new ActiveXObject("Microsoft.XMLHTTP");
	}
}

function ajaxMultiRequest(method, url, options) { // , mode, respContainer) {
		
	// create the request
	var xhttp = createRequest();
	
	// get the response
    xhttp.onreadystatechange = function() {
		
		// readyState 4 : request finished and response is ready
		// status 200: "OK" ; 201: "Created"
    	if (xhttp.readyState == 4 && (xhttp.status == 200 || xhttp.status == 201)) {
    		
    		// deal with the gotten response (see example below)
    		processAjaxMultiAnswer(xhttp, method, url, options);
   		}
    };
  
  // send the request (see example below)
  sendMultiRequest(xhttp, method, url, options); 
  
} 


/* EXAMPLE
 * ******************
function sendRequest(xhttp, method, url, options) {
	
	if (method == "post") {
		  sendPostRequest(xhttp, url);
	  } else {
		  sendGetRequest(xhttp, url);
	  }
}
*/

/* Example : 
 * var parameters = "v1Name="+ v1 + "&" + "v2Name=" + v2;
 */
function sendGetRequest(xhttp, url, parameters) {
	
	if (parameters == null || parameters == "") {
		xhttp.open("GET", url, true);
	} else {
		xhttp.open("GET", url + "?"+ parameters, true);
	}
	xhttp.send();
}

/* Example : 
 * var parameters = "v1Name="+ v1 + "&" + "v2Name=" + v2;
 */
function sendPostRequest(xhttp, url, parameters) {
	xhttp.open("POST", url, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(parameters);
}

/* EXAMPLE
 * ******************
function processAjaxAnswer(xhttp, method, url, options) {
	
	var mode = options[0];
	var respContainer = options[1];
	
	document.getElementById(respContainer).textContent = xhttp.responseText;
	
	if (mode == "Xml") {
		processAccountXmlAnswer(xhttp);
	}
	if (mode == "Json") {
		processAccountJsonAnswer(xhttp);
	}
}
*/