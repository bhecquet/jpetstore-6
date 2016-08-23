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

function getXML(shortUrl){
			
	ajaxAnswer("get", getRelativeUrl(shortUrl), "Xml", "resp");
}

function getJSON(shortUrl){
	ajaxAnswer("get", getRelativeUrl(shortUrl), "Json", "resp");
}


function sendGetRequest(xhttp, url) {
	// header: specifies the header name
	// value: specifies the header value
// 		setRequestHeader(header, value)
		
	var pId = document.getElementById("t1").value;
	document.getElementById("quest").textContent = "get product id# " + pId;
	
	var parameters = "tbOrderId="+ pId;
	
	//  asynchronous always true
	xhttp.open("GET", url + "?"+ parameters, true);
	xhttp.send();
}


function processXmlAnswer(xhttp) {
	
	var xmlDoc = xhttp.responseXML;
	
	var table="<table>"
		 	+ "<tr><td>Order</td></tr>";
	var root = xmlDoc.getElementsByTagName("order");
	//debbugError(root[0].childNodes.length);
	if (root[0].childNodes.length > 0) {
		//table+= getXmlTableRow("description", root);
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
	 		+ "<tr><td>Order</td></tr>";
	
	//table+= getJsonTableRow("description", obj.description);
	
	table+="</table>";
	document.getElementById("niceResp").innerHTML = table;
}

function getJsonTableRow(item, value) {
	return "<tr><td>" + item + "</td><td>" + value + "</td></tr>"
}