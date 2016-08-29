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
function getOrderXML(shortUrl){
	var options = ["Xml", "resp"];
	ajaxRequest("get", getRelativeUrl(shortUrl), options);
}

function getOrderJSON(shortUrl){
	var options = ["Json", "resp"];
	ajaxRequest("get", getRelativeUrl(shortUrl), options);
}


function sendRequest(xhttp, method, url, options) {
	
	var mode = options[0];
	
	if (mode != null && mode != "undefined") {
		sendGetRequestOrder(xhttp, url + mode);
	} else {
		sendGetRequestOrder(xhttp, url);
	}
}

function sendGetRequestOrder(xhttp, url) {
		
	var pOrderId = document.getElementById("orderId").value;
	document.getElementById("quest").textContent = "get order id# " + pOrderId;
	
	var parameters = "tbOrderId="+ pOrderId;
	
	sendGetRequest(xhttp, url, parameters);
}


function processAjaxAnswer(xhttp, method, url, options) {
	
	var mode = options[0];
	var respContainer = options[1];
	
	document.getElementById(respContainer).textContent = xhttp.responseText;
	
	if (mode == "Xml") {
		processOrderXmlAnswer(xhttp);
	}
	if (mode == "Json") {
		processOrderJsonAnswer(xhttp);
	}
}

function processOrderXmlAnswer(xhttp) {
	
	var xmlDoc = xhttp.responseXML;
	
	var table="<table>"
		 	+ "<tr><td>Order</td></tr>";
	var root = xmlDoc.getElementsByTagName("order");
	
	table+= printXmlTableRow("orderId", root, 0);
	table+= printXmlTableRow("orderDate", root, 0);
	table+= printXmlTableRow("username", root, 0);
	table+="</table><br/>";
	
	if (root.length > 0) {
		table+="<table>";
		table+= "<tr><td>Line Items</td></tr>";
		var lineItems = root[0].getElementsByTagName("lineItems");
		
		for (i=0; i < lineItems.length; i++) {
			
			table+= "<tr><td>Line Item</td></tr>";
			table+= printXmlTableRow("itemId", lineItems, i);
			table+= printXmlTableRow("lineNumber", lineItems, i);
			table+= printXmlTableRow("orderId", lineItems, i);
			table+= printXmlTableRow("quantity", lineItems, i);
			table+= printXmlTableRow("unitPrice", lineItems, i);
			
			item = lineItems[i].getElementsByTagName("item");
			
			table+= "<tr><td>Item</td></tr>";
			table+= printXmlTableRow("itemId", item, 0);
			table+= printXmlTableRow("attribute1", item, 0);
			table+= printXmlTableRow("attribute2", item, 0);
			table+= printXmlTableRow("attribute3", item, 0);
			table+= printXmlTableRow("attribute4", item, 0);
			table+= printXmlTableRow("attribute5", item, 0);
			table+= printXmlTableRow("unitCost", item, 0);
			table+= printXmlTableRow("status", item, 0);
			table+= printXmlTableRow("quantity", item, 0);
			table+= printXmlTableRow("supplierId", item, 0);
			
			table+= "<tr><td>Product</td></tr>";
			product = item[0].getElementsByTagName("product");
			
			table+= printXmlTableRow("description", product, 0);
			table+= printXmlTableRow("productId", product, 0);
			table+= printXmlTableRow("name", product, 0);
			table+= printXmlTableRow("categoryId", product, 0);
		}
		table+="</table><br/>";
		
		table+="<table>";
		table+= printXmlTableRow("totalPrice", root, 0);
		table+="</table><br/>";
		
		table+="<table>";
		table+= "<tr><td>Payement Details</td></tr>";
		table+= printXmlTableRow("cardType", root, 0);
		table+= printXmlTableRow("creditCard", root, 0);
		table+= printXmlTableRow("expiryDate", root, 0);
		table+="</table><br/>";
		
		table+="<table>";
		table+= "<tr><td>Billing Address</td></tr>";
		table+= printXmlTableRow("billToFirstName", root, 0);
		table+= printXmlTableRow("billToLastName", root, 0);
		table+= printXmlTableRow("billAddress1", root, 0);
		table+= printXmlTableRow("billAddress2", root, 0);
		table+= printXmlTableRow("billZip", root, 0);
		table+= printXmlTableRow("billCity", root, 0);
		table+= printXmlTableRow("billState", root, 0);
		table+= printXmlTableRow("billCountry", root, 0);
		table+="</table><br/>";
		
		table+="<table>";
		table+= "<tr><td>Shipping Address</td></tr>";
		table+= printXmlTableRow("shipToFirstName", root, 0);
		table+= printXmlTableRow("shipToLastName", root, 0);
		table+= printXmlTableRow("shipAddress1", root, 0);
		table+= printXmlTableRow("shipAddress2", root, 0);
		table+= printXmlTableRow("shipZip", root, 0);
		table+= printXmlTableRow("shipCity", root, 0);
		table+= printXmlTableRow("shipState", root, 0);
		table+= printXmlTableRow("shipCountry", root, 0);
		table+="</table><br/>";
		
		table+="<table>";
		table+= "<tr><td>Shipping Details</td></tr>";
		table+= printXmlTableRow("courier", root, 0);
		table+= printXmlTableRow("locale", root, 0);
		table+= printXmlTableRow("status", root, 0);
		table+="</table>";
		
		document.getElementById("niceResp").innerHTML = table;
	}
}


function processOrderJsonAnswer(xhttp) {
	
	var obj = JSON.parse(xhttp.responseText);	
	
	var table="<table>"
	 		+ "<tr><td>Order</td></tr>";
	
	table+= printJsonTableRow("orderId", obj.orderId);
	table+= printJsonTableRow("orderDate", obj.orderDate);
	table+= printJsonTableRow("username", obj.username);
	table+="</table><br/>";
	
	// lineItems
	table+="<table>";
	table+= "<tr><td>Line Items</td></tr>";
	
	for (i=0; i < obj.lineItems.length; i++) {
		
		table+= "<tr><td>Line Item</td></tr>";
		table+= printJsonTableRow("itemId", obj.lineItems[i].itemId);
		table+= printJsonTableRow("lineNumber", obj.lineItems[i].lineNumber);
		table+= printJsonTableRow("orderId", obj.lineItems[i].orderId);
		table+= printJsonTableRow("quantity", obj.lineItems[i].quantity);
		table+= printJsonTableRow("unitPrice", obj.lineItems[i].unitPrice);
		
		table+= "<tr><td>Item</td></tr>";
		table+= printJsonTableRow("itemId", obj.lineItems[i].item.itemId);
		table+= printJsonTableRow("attribute1", obj.lineItems[i].item.attribute1);
		table+= printJsonTableRow("attribute2", obj.lineItems[i].item.attribute2);
		table+= printJsonTableRow("attribute3", obj.lineItems[i].item.attribute3);
		table+= printJsonTableRow("attribute4", obj.lineItems[i].item.attribute4);
		table+= printJsonTableRow("attribute5", obj.lineItems[i].item.attribute5);
		table+= printJsonTableRow("unitCost", obj.lineItems[i].item.unitCost);
		table+= printJsonTableRow("status", obj.lineItems[i].item.status);
		table+= printJsonTableRow("quantity", obj.lineItems[i].item.quantity);
		table+= printJsonTableRow("supplierId", obj.lineItems[i].item.supplierId);
		
		table+= "<tr><td>Product</td></tr>";
		table+= printJsonTableRow("description", obj.lineItems[i].item.product.description);
		table+= printJsonTableRow("productId", obj.lineItems[i].item.product.productId);
		table+= printJsonTableRow("name", obj.lineItems[i].item.product.name);
		table+= printJsonTableRow("categoryId", obj.lineItems[i].item.product.categoryId);
	}
	table+="</table><br/>";
	
	table+="<table>";
	table+= printJsonTableRow("totalPrice", obj.totalPrice);
	table+="</table><br/>";
	
	table+="<table>";
	table+= "<tr><td>Payement Details</td></tr>";
	table+= printJsonTableRow("cardType", obj.cardType);
	table+= printJsonTableRow("creditCard", obj.creditCard);
	table+= printJsonTableRow("expiryDate", obj.expiryDate);
	table+="</table><br/>";
	
	table+="<table>";
	table+= "<tr><td>Billing Address</td></tr>";
	table+= printJsonTableRow("billToFirstName", obj.billToFirstName);
	table+= printJsonTableRow("billToLastName", obj.billToLastName);
	table+= printJsonTableRow("billAddress1", obj.billAddress1);
	table+= printJsonTableRow("billAddress2", obj.billAddress2);
	table+= printJsonTableRow("billZip", obj.billZip);
	table+= printJsonTableRow("billCity", obj.billCity);
	table+= printJsonTableRow("billState", obj.billState);
	table+= printJsonTableRow("billCountry", obj.billCountry);
	table+="</table><br/>";
	
	table+="<table>";
	table+= "<tr><td>Shipping Address</td></tr>";
	table+= printJsonTableRow("shipToFirstName", obj.shipToFirstName);
	table+= printJsonTableRow("shipToLastName", obj.shipToLastName);
	table+= printJsonTableRow("shipAddress1", obj.shipAddress1);
	table+= printJsonTableRow("shipAddress2", obj.shipAddress2);
	table+= printJsonTableRow("shipZip", obj.shipZip);
	table+= printJsonTableRow("shipCity", obj.shipCity);
	table+= printJsonTableRow("shipState", obj.shipState);
	table+= printJsonTableRow("shipCountry", obj.shipCountry);
	table+="</table><br/>";
	
	table+="<table>";
	table+= "<tr><td>Shipping Details</td></tr>";
	table+= printJsonTableRow("courier", obj.courier);
	table+= printJsonTableRow("locale", obj.locale);
	table+= printJsonTableRow("status", obj.status);
	table+="</table>";
	
	document.getElementById("niceResp").innerHTML = table;
}