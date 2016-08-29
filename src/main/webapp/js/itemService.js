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
function getItemXML(shortUrl){
	var options = ["Xml", "resp"];
	ajaxRequest("get", getRelativeUrl(shortUrl), options);
}

function getItemJSON(shortUrl){
	var options = ["Json", "resp"];
	ajaxRequest("get", getRelativeUrl(shortUrl), options);
}


function sendRequest(xhttp, method, url, options) {
	
	var mode = options[0];
	
	var pItemId = document.getElementById("itemId").value;
	
	if (mode != null && mode != "undefined") {
		sendGetRequestItem(xhttp, url + mode, pItemId);
	} else {
		sendGetRequestItem(xhttp, url, pItemId);
	}
}

function sendGetRequestItem(xhttp, url, pItemId) {
	
	document.getElementById("quest").textContent = "get item id# " + pItemId;
	
	var parameters = "tbItemId="+ pItemId;
	
	sendGetRequest(xhttp, url, parameters);
}


function processAjaxAnswer(xhttp, method, url, options) {
	
	var mode = options[0];
	var respContainer = options[1];
	
	document.getElementById(respContainer).textContent = xhttp.responseText;
	
	if (mode == "Xml") {
		processItemXmlAnswer(xhttp);
	}
	if (mode == "Json") {
		processItemJsonAnswer(xhttp);
	}
}

function processItemXmlAnswer(xhttp) {
	
	var xmlDoc = xhttp.responseXML;
	
	var table="<table>"
		 	+ "<tr><td>Item</td></tr>";
	var root = xmlDoc.getElementsByTagName("item");
	
	product = root[0].getElementsByTagName("product");
		
	table+= printXmlTableRow("description", product, 0);
	table+= printXmlTableRow("productId", product, 0);
	table+= printXmlTableRow("name", product, 0);
	table+= printXmlTableRow("categoryId", product, 0);
	
	table+= printXmlTableRow("itemId", root, 0);
	table+= printXmlTableRow("attribute1", root, 0);
	table+= printXmlTableRow("attribute2", root, 0);
	table+= printXmlTableRow("attribute3", root, 0);
	table+= printXmlTableRow("attribute4", root, 0);
	table+= printXmlTableRow("attribute5", root, 0);
	table+= printXmlTableRow("unitCost", root, 0);
	table+= printXmlTableRow("status", root, 0);
	table+= printXmlTableRow("quantity", root, 0);
	table+= printXmlTableRow("supplierId", root, 0);
    
	table+="</table>";
	document.getElementById("niceResp").innerHTML = table;
}


function processItemJsonAnswer(xhttp) {
	
	var obj = JSON.parse(xhttp.responseText);	
	
	var table="<table>"
	 		+ "<tr><td>Item</td></tr>";
	
	table+= printJsonTableRow("description", obj.product.description);
	table+= printJsonTableRow("productId", obj.product.productId);
	table+= printJsonTableRow("name", obj.product.name);
	table+= printJsonTableRow("categoryId", obj.product.categoryId);
	
	table+= printJsonTableRow("itemId", obj.itemId);
	table+= printJsonTableRow("attribute1", obj.attribute1);
	table+= printJsonTableRow("attribute2", obj.attribute2);
	table+= printJsonTableRow("attribute3", obj.attribute3);
	table+= printJsonTableRow("attribute4", obj.attribute4);
	table+= printJsonTableRow("attribute5", obj.attribute5);
	table+= printJsonTableRow("unitCost", obj.unitCost);
	table+= printJsonTableRow("status", obj.status);
	table+= printJsonTableRow("quantity", obj.quantity);
	table+= printJsonTableRow("supplierId", obj.supplierId);
	
	table+="</table>";
	document.getElementById("niceResp").innerHTML = table;
}
