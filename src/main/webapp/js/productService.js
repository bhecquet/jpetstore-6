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
function getProductXML(shortUrl){
	var options = ["Xml", "resp"];
	ajaxRequest("get", getRelativeUrl(shortUrl), options);
}

function getProductJSON(shortUrl){
	var options = ["Json", "resp"];
	ajaxRequest("get", getRelativeUrl(shortUrl), options);
}


function sendRequest(xhttp, method, url, options) {
	
	var mode = options[0];
	
	if (mode != null && mode != "undefined") {
		sendGetRequestProduct(xhttp, url + mode);
	} else {
		sendGetRequestProduct(xhttp, url);
	}
}

function sendGetRequestProduct(xhttp, url) {
		
	var pProductId = document.getElementById("productId").value;
	document.getElementById("quest").textContent = "get product id# " + pProductId;
	
	var parameters = "tbProductId="+ pProductId;
	
	sendGetRequest(xhttp, url, parameters);
}


function processAjaxAnswer(xhttp, method, url, options) {
	
	var mode = options[0];
	var respContainer = options[1];
	
	document.getElementById(respContainer).textContent = xhttp.responseText;
	
	if (mode == "Xml") {
		processProductXmlAnswer(xhttp);
	}
	if (mode == "Json") {
		processProductJsonAnswer(xhttp);
	}
}

function processProductXmlAnswer(xhttp) {
	
	var xmlDoc = xhttp.responseXML;
	
	var table="<table>"
		 	+ "<tr><td>Product</td></tr>";
	var root = xmlDoc.getElementsByTagName("product");
	
	table+= printXmlTableRow("description", root, 0);
	table+= printXmlTableRow("productId", root, 0);
	table+= printXmlTableRow("name", root, 0);
	table+= printXmlTableRow("categoryId", root, 0);
    
	table+="</table>";
	document.getElementById("niceResp").innerHTML = table;
}


function processProductJsonAnswer(xhttp) {
	
	var obj = JSON.parse(xhttp.responseText);	
	
	var table="<table>"
	 		+ "<tr><td>Product</td></tr>";
	
	table+= printJsonTableRow("description", obj.description);
	table+= printJsonTableRow("productId", obj.productId);
	table+= printJsonTableRow("name", obj.name);
	table+= printJsonTableRow("categoryId", obj.categoryId);
	
	table+="</table>";
	document.getElementById("niceResp").innerHTML = table;
}