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
function postAccountXML(shortUrl){
	var options = ["Xml", "resp"];
	ajaxRequest("post", getRelativeUrl(shortUrl), options);
}

function postAccountJSON(shortUrl){
	var options = ["Json", "resp"];
	ajaxRequest("post", getRelativeUrl(shortUrl), options);
}


function sendRequest(xhttp, method, url, options) {
	
	var mode = options[0];
	
	if (mode != null && mode != "undefined") {
		sendPostRequestAccount(xhttp, url + mode);
	} else {
		sendPostRequestAccount(xhttp, url);
	}
}

function sendPostRequestAccount(xhttp, url) {
		
	var pUsername = document.getElementById("username").value;
	var pPassword = document.getElementById("password").value;
	document.getElementById("quest").textContent = "get account of " + pUsername;
	
	var parameters = "tbUsername="+ pUsername + "&tbPassword=" + pPassword;
	
	sendPostRequest(xhttp, url, parameters);
}


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

function processAccountXmlAnswer(xhttp) {
	
	var xmlDoc = xhttp.responseXML;
	
	var table="<table>"
		 	+ "<tr><td>Account</td></tr>";
	var root = xmlDoc.getElementsByTagName("account");
	
	table+= printXmlTableRow("username", root, 0);
	table+= printXmlTableRow("firstName", root, 0);
	table+= printXmlTableRow("lastName", root, 0);
	table+= printXmlTableRow("email", root, 0);
	table+= printXmlTableRow("phone", root, 0);
	table+= printXmlTableRow("address1", root, 0);
	table+= printXmlTableRow("address2", root, 0);
	table+= printXmlTableRow("city", root, 0);
	table+= printXmlTableRow("state", root, 0);
	table+= printXmlTableRow("zip", root, 0);
	table+= printXmlTableRow("country", root, 0);
	table+= printXmlTableRow("languagePreference", root, 0);
	table+= printXmlTableRow("favouriteCategoryId", root, 0);
	table+= printXmlTableRow("listOption", root, 0);
	table+= printXmlTableRow("bannerOption", root, 0);
	table+= printXmlTableRow("bannerName", root, 0);
    
	table+="</table>";
	document.getElementById("niceResp").innerHTML = table;
}


function processAccountJsonAnswer(xhttp) {
	
	var obj = JSON.parse(xhttp.responseText);	
	
	var table="<table>"
	 		+ "<tr><td>Account</td></tr>";
	
	table+= printJsonTableRow("username", obj.username);
	table+= printJsonTableRow("firstName", obj.firstName);
	table+= printJsonTableRow("lastName", obj.lastName);
	table+= printJsonTableRow("email", obj.email);
	table+= printJsonTableRow("phone", obj.phone);
	table+= printJsonTableRow("address1", obj.address1);
	table+= printJsonTableRow("address2", obj.address2);
	table+= printJsonTableRow("city", obj.city);
	table+= printJsonTableRow("state", obj.state);
	table+= printJsonTableRow("zip", obj.zip);
	table+= printJsonTableRow("country", obj.country);
	table+= printJsonTableRow("languagePreference", obj.languagePreference);
	table+= printJsonTableRow("favouriteCategoryId", obj.favouriteCategoryId);
	table+= printJsonTableRow("listOption", obj.listOption);
	table+= printJsonTableRow("bannerOption", obj.bannerOption);
	table+= printJsonTableRow("bannerName", obj.bannerName);
	
	table+="</table>";
	document.getElementById("niceResp").innerHTML = table;
}