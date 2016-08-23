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
function getRelativeUrl(shortUrl){
		
	var location = window.location.href
	return location.split("/jpetstore")[0] + shortUrl; 
}

function postXML(shortUrl){
	ajaxAnswer("post", getRelativeUrl(shortUrl), "Xml", "resp");
}

function postJSON(shortUrl){
	ajaxAnswer("post", getRelativeUrl(shortUrl), "Json", "resp");
}

function sendPostRequest(xhttp, url) {
	// header: specifies the header name
	// value: specifies the header value
// 	setRequestHeader(header, value)
		
	var pUsername = document.getElementById("t1").value;
	var pPassword = document.getElementById("t2").value;
	document.getElementById("quest").textContent = "get account of " + pUsername;
	
	var parameters = "tbUsername="+ pUsername + "&tbPassword=" + pPassword;
	
	xhttp.open("POST", url, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(parameters);
}


function processXmlAnswer(xhttp) {
	
	var xmlDoc = xhttp.responseXML;
	
	var table="<table>"
		 	+ "<tr><td>Product</td></tr>";
	var root = xmlDoc.getElementsByTagName("account");
	//debbugError(root[0].childNodes.length);
	if (root[0].childNodes.length > 0) {
		table+= getXmlTableRow("username", root);
		table+= getXmlTableRow("firstName", root);
		table+= getXmlTableRow("lastName", root);
		table+= getXmlTableRow("email", root);
		table+= getXmlTableRow("phone", root);
    	table+= getXmlTableRow("address1", root);
    	table+= getXmlTableRow("address2", root);
    	table+= getXmlTableRow("city", root);
    	table+= getXmlTableRow("state", root);
    	table+= getXmlTableRow("zip", root);
    	table+= getXmlTableRow("country", root);
    	table+= getXmlTableRow("languagePreference", root);
    	table+= getXmlTableRow("favouriteCategoryId", root);
    	table+= getXmlTableRow("listOption", root);
    	table+= getXmlTableRow("bannerOption", root);
    	table+= getXmlTableRow("bannerName", root);
    	table+= getXmlTableRow("status", root);
    }
	table+="</table>";
	document.getElementById("niceResp").innerHTML = table;
}

function getXmlTableRow(item, rootElem) {
	return "<tr><td>" + item + "</td><td>" + rootElem[0].getElementsByTagName(item)[0].childNodes[0].nodeValue + "</td></tr>"
}


function processJsonAnswer(xhttp) {
	
	var obj = JSON.parse(xhttp.responseText);	
	
	var table="<table>"
	 		+ "<tr><td>Product</td></tr>";
	
	table+= getJsonTableRow("username", obj.username);
	table+= getJsonTableRow("firstName", obj.firstName);
	table+= getJsonTableRow("lastName", obj.lastName);
	table+= getJsonTableRow("email", obj.email);
	table+= getJsonTableRow("phone", obj.phone);
	table+= getJsonTableRow("address1", obj.address1);
	table+= getJsonTableRow("address2", obj.address2);
	table+= getJsonTableRow("city", obj.city);
	table+= getJsonTableRow("state", obj.state);
	table+= getJsonTableRow("zip", obj.zip);
	table+= getJsonTableRow("country", obj.country);
	table+= getJsonTableRow("languagePreference", obj.languagePreference);
	table+= getJsonTableRow("favouriteCategoryId", obj.favouriteCategoryId);
	table+= getJsonTableRow("listOption", obj.listOption);
	table+= getJsonTableRow("bannerOption", obj.bannerOption);
	table+= getJsonTableRow("bannerName", obj.bannerName);
	table+= getJsonTableRow("status", obj.status);
	
	table+="</table>";
	document.getElementById("niceResp").innerHTML = table;
}

function getJsonTableRow(item, value) {
	return "<tr><td>" + item + "</td><td>" + value + "</td></tr>"
}