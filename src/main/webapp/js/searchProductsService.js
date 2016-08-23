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
		
	var keywords = document.getElementById("t1").value;
	document.getElementById("quest").textContent = "get products with " + keywords;
	
	var parameters = "tbKeywords="+ keywords;
	
	//  asynchronous always true
	xhttp.open("GET", url + "?"+ parameters, true);
	xhttp.send();
}


function processXmlAnswer(xhttp) {
	
	var xmlDoc = xhttp.responseXML;
	
	var table="<table>"
		 	+ "<tr><td>Products</td></tr>";
	var root = xmlDoc.getElementsByTagName("product");
	
	if (root.length > 0) {
		for (i=0; i < root.length; i++) {
			table+= getXmlTableRow("description", root, i);
			table+= getXmlTableRow("productId", root, i);
			table+= getXmlTableRow("name", root, i);
			table+= getXmlTableRow("categoryId", root, i);
		}
    }
	table+="</table>";
	document.getElementById("niceResp").innerHTML = table;
}

function getXmlTableRow(item, rootElem, index) {
	return "<tr><td>" + item + "</td><td>" + rootElem[index].getElementsByTagName(item)[0].childNodes[0].nodeValue + "</td></tr>"
}


function processJsonAnswer(xhttp) {
	
	var obj = JSON.parse(xhttp.responseText);	
	
	var table="<table>"
	 		+ "<tr><td>Products</td></tr>";

	for (i=0; i < obj.length; i++) {
		table+= getJsonTableRow("description", obj[i].description);
		table+= getJsonTableRow("productId", obj[i].productId);
		table+= getJsonTableRow("name", obj[i].name);
		table+= getJsonTableRow("categoryId", obj[i].categoryId);
	}
	table+="</table>";
	document.getElementById("niceResp").innerHTML = table;
}

function getJsonTableRow(item, value) {
	return "<tr><td>" + item + "</td><td>" + value + "</td></tr>"
}