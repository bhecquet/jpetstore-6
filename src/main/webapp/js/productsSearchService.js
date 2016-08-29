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
function searchProductsXML(shortUrl){
	var options = ["Xml", "resp"];
	ajaxRequest("get", getRelativeUrl(shortUrl), options);
}

function searchProductsJSON(shortUrl){
	var options = ["Json", "resp"];
	ajaxRequest("get", getRelativeUrl(shortUrl), options);
}


function sendRequest(xhttp, method, url, options) {
	
	var mode = options[0];
	
	if (mode != null && mode != "undefined") {
		sendGetRequestSearchProducts(xhttp, url + mode);
	} else {
		sendGetRequestSearchProducts(xhttp, url);
	}
}

function sendGetRequestSearchProducts(xhttp, url) {
		
	var pKeywords = document.getElementById("keywords").value;
	document.getElementById("quest").textContent = "get products with " + pKeywords;
	
	var parameters = "tbKeywords="+ pKeywords;
	
	sendGetRequest(xhttp, url, parameters);
}


function processAjaxAnswer(xhttp, method, url, options) {
	
	var mode = options[0];
	var respContainer = options[1];
	
	document.getElementById(respContainer).textContent = xhttp.responseText;
	
	if (mode == "Xml") {
		processProductsXmlAnswer(xhttp);
	}
	if (mode == "Json") {
		processProductsJsonAnswer(xhttp);
	}
}

function processProductsXmlAnswer(xhttp) {
	
	var xmlDoc = xhttp.responseXML;
	
	var table="<table>"
		 	+ "<tr><td>Products</td></tr>";
	var root = xmlDoc.getElementsByTagName("product");

	for (i=0; i < root.length; i++) {
		table+= printXmlTableRow("description", root, i);
		table+= printXmlTableRow("productId", root, i);
		table+= printXmlTableRow("name", root, i);
		table+= printXmlTableRow("categoryId", root, i);
	}
    
	table+="</table>";
	document.getElementById("niceResp").innerHTML = table;
}


function processProductsJsonAnswer(xhttp) {
	
	var obj = JSON.parse(xhttp.responseText);	
	
	var table="<table>"
	 		+ "<tr><td>Products</td></tr>";

	for (i=0; i < obj.length; i++) {
		table+= printJsonTableRow("description", obj[i].description);
		table+= printJsonTableRow("productId", obj[i].productId);
		table+= printJsonTableRow("name", obj[i].name);
		table+= printJsonTableRow("categoryId", obj[i].categoryId);
	}
	table+="</table>";
	document.getElementById("niceResp").innerHTML = table;
}