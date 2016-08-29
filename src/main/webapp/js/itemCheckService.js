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
function getAvailability(shortUrl){
	var options = ["undefined", "resp"];
	ajaxRequest("get", getRelativeUrl(shortUrl), options);
}


function sendRequest(xhttp, method, url, options) {
	
	var mode = options[0];
	
	if (mode != null && mode != "undefined") {
		sendGetRequestAvailability(xhttp, url + mode);
	} else {
		sendGetRequestAvailability(xhttp, url);
	}
}

function sendGetRequestAvailability(xhttp, url) {
		
	var pItemId = document.getElementById("itemId").value;
	document.getElementById("quest").textContent = "get item id# " + pItemId;
	
	var parameters = "tbItemId="+ pItemId;
	
	sendGetRequest(xhttp, url, parameters);
}


function processAjaxAnswer(xhttp, method, url, options) {
	
	var respContainer = options[1];
	
	document.getElementById(respContainer).textContent = xhttp.responseText;
	
	processAnswerAvailability(xhttp);

}

function processAnswerAvailability(xhttp) {
	
	document.getElementById("niceResp").innerHTML = xhttp.responseText;
}
