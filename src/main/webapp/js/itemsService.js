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
function getItemsXML(shortUrl){
	var options = ["Xml", "resp"];
	ajaxRequest("get", getRelativeUrl(shortUrl), options);
}

function getItemsJSON(shortUrl){
	var options = ["Json", "resp"];
	ajaxRequest("get", getRelativeUrl(shortUrl), options);
}


function sendRequest(xhttp, method, url, options) {
	
	var mode = options[0];
	
	var pProductId = document.getElementById("productId").value;
	
	if (mode != null && mode != "undefined") {
		sendGetRequestItems(xhttp, url + mode, pProductId);
	} else {
		sendGetRequestItems(xhttp, url, pProductId);
	}
}

function sendGetRequestItems(xhttp, url, pProductId) {
	
	document.getElementById("quest").textContent = "get items from product id# " + pProductId;
	
	var parameters = "tbProductId="+ pProductId;
	
	sendGetRequest(xhttp, url, parameters);
}


function processAjaxAnswer(xhttp, method, url, options) {
	
	var mode = options[0];
	var respContainer = options[1];
	
	document.getElementById(respContainer).textContent = xhttp.responseText;
	
	if (mode == "Xml") {
		processItemsXmlAnswer(xhttp);
	}
	if (mode == "Json") {
		processItemsJsonAnswer(xhttp);
	}
}

function processItemsXmlAnswer(xhttp) {
	
	var xmlDoc = xhttp.responseXML;
	
	var table="<table>"
		 	+ "<tr><td>Products</td></tr>";
	var root = xmlDoc.getElementsByTagName("item");
	
	for (i=0; i < root.length; i++) {
		
		product = root[i].getElementsByTagName("product");
		
		table+= printXmlTableRow("description", product, 0);
		table+= printXmlTableRow("productId", product, 0);
		table+= printXmlTableRow("name", product, 0);
		table+= printXmlTableRow("categoryId", product, 0);
		
		table+= printXmlTableRow("itemId", root, i);
		table+= printXmlTableRow("attribute1", root, i);
		table+= printXmlTableRow("attribute2", root, i);
		table+= printXmlTableRow("attribute3", root, i);
		table+= printXmlTableRow("attribute4", root, i);
		table+= printXmlTableRow("attribute5", root, i);
		table+= printXmlTableRow("unitCost", root, i);
		table+= printXmlTableRow("status", root, i);
		table+= printXmlTableRow("quantity", root, i);
		table+= printXmlTableRow("supplierId", root, i);
	}
    
	table+="</table>";
	document.getElementById("niceResp").innerHTML = table;
}


function processItemsJsonAnswer(xhttp) {
	
	var obj = JSON.parse(xhttp.responseText);	
	
	var table="<table>"
	 		+ "<tr><td>Products</td></tr>";

	for (i=0; i < obj.length; i++) {
		table+= printJsonTableRow("description", obj[i].product.description);
		table+= printJsonTableRow("productId", obj[i].product.productId);
		table+= printJsonTableRow("name", obj[i].product.name);
		table+= printJsonTableRow("categoryId", obj[i].product.categoryId);
		
		table+= printJsonTableRow("itemId", obj[i].itemId);
		table+= printJsonTableRow("attribute1", obj[i].attribute1);
		table+= printJsonTableRow("attribute2", obj[i].attribute2);
		table+= printJsonTableRow("attribute3", obj[i].attribute3);
		table+= printJsonTableRow("attribute4", obj[i].attribute4);
		table+= printJsonTableRow("attribute5", obj[i].attribute5);
		table+= printJsonTableRow("unitCost", obj[i].unitCost);
		table+= printJsonTableRow("status", obj[i].status);
		table+= printJsonTableRow("quantity", obj[i].quantity);
		table+= printJsonTableRow("supplierId", obj[i].supplierId);
	}
	table+="</table>";
	document.getElementById("niceResp").innerHTML = table;
}
