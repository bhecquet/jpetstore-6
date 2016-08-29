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
function getOrdersXML(shortUrl){
	var options = ["Xml", "resp"];
	ajaxRequest("get", getRelativeUrl(shortUrl), options);
}

function getOrdersJSON(shortUrl){
	var options = ["Json", "resp"];
	ajaxRequest("get", getRelativeUrl(shortUrl), options);
}


function sendRequest(xhttp, method, url, options) {
	
	var mode = options[0];
	
	if (mode != null && mode != "undefined") {
		sendGetRequestOrders(xhttp, url + mode);
	} else {
		sendGetRequestOrders(xhttp, url);
	}
}

function sendGetRequestOrders(xhttp, url) {
		
	var pUsername = document.getElementById("username").value;
	document.getElementById("quest").textContent = "get orders of " + pUsername;
	
	var parameters = "tbUsername="+ pUsername;
	
	sendGetRequest(xhttp, url, parameters);
}


function processAjaxAnswer(xhttp, method, url, options) {
	
	var mode = options[0];
	var respContainer = options[1];
	
	document.getElementById(respContainer).textContent = xhttp.responseText;
	
	if (mode == "Xml") {
		processOrdersXmlAnswer(xhttp);
	}
	if (mode == "Json") {
		processOrdersJsonAnswer(xhttp);
	}
}

function processOrdersXmlAnswer(xhttp) {
	
	var xmlDoc = xhttp.responseXML;
	
	var table="<table>"
		 	+ "<tr><td>Orders</td></tr>";
	table+="</table>";
	
	var order = xmlDoc.getElementsByTagName("order");
	
	for (j=0; j < order.length; j++) {
		
		table+="<br/><hr/><br/>";
		
		table+="<table>";
		table+= printXmlTableRow("orderId", order, j);
		table+= printXmlTableRow("orderDate", order, j);
		table+= printXmlTableRow("username", order, j);
		table+="</table><br/>";
		
		table+="<table>";
		table+= printXmlTableRow("totalPrice", order, j);
		table+="</table><br/>";
		
		table+="<table>";
		table+= "<tr><td>Payement Details</td></tr>";
		table+= printXmlTableRow("cardType", order, j);
		table+= printXmlTableRow("creditCard", order, j);
		table+= printXmlTableRow("expiryDate", order, j);
		table+="</table><br/>";
		
		table+="<table>";
		table+= "<tr><td>Billing Address</td></tr>";
		table+= printXmlTableRow("billToFirstName", order, j);
		table+= printXmlTableRow("billToLastName", order, j);
		table+= printXmlTableRow("billAddress1", order, j);
		table+= printXmlTableRow("billAddress2", order, j);
		table+= printXmlTableRow("billZip", order, j);
		table+= printXmlTableRow("billCity", order, j);
		table+= printXmlTableRow("billState", order, j);
		table+= printXmlTableRow("billCountry", order, j);
		table+="</table><br/>";
		
		table+="<table>";
		table+= "<tr><td>Shipping Address</td></tr>";
		table+= printXmlTableRow("shipToFirstName", order, j);
		table+= printXmlTableRow("shipToLastName", order, j);
		table+= printXmlTableRow("shipAddress1", order, j);
		table+= printXmlTableRow("shipAddress2", order, j);
		table+= printXmlTableRow("shipZip", order, j);
		table+= printXmlTableRow("shipCity", order, j);
		table+= printXmlTableRow("shipState", order, j);
		table+= printXmlTableRow("shipCountry", order, j);
		table+="</table><br/>";
		
		table+="<table>";
		table+= "<tr><td>Shipping Details</td></tr>";
		table+= printXmlTableRow("courier", order, j);
		table+= printXmlTableRow("locale", order, j);
		table+= printXmlTableRow("status", order, j);
		table+="</table>";
				
		document.getElementById("niceResp").innerHTML = table;
	}
}


function processOrdersJsonAnswer(xhttp) {
	
	var obj = JSON.parse(xhttp.responseText);	
	
	var table="<table>"
	 		+ "<tr><td>Order</td></tr>";
	table+="</table>";
	
	for (j=0; j < obj.length; j++) {
	
		table+="<br/><hr/><br/>";
		
		table+="<table>";
		table+= printJsonTableRow("orderId", obj[j].orderId);
		table+= printJsonTableRow("orderDate", obj[j].orderDate);
		table+= printJsonTableRow("username", obj[j].username);
		table+="</table><br/>";
		
		table+="<table>";
		table+= printJsonTableRow("totalPrice", obj[j].totalPrice);
		table+="</table><br/>";
		
		table+="<table>";
		table+= "<tr><td>Payement Details</td></tr>";
		table+= printJsonTableRow("cardType", obj[j].cardType);
		table+= printJsonTableRow("creditCard", obj[j].creditCard);
		table+= printJsonTableRow("expiryDate", obj[j].expiryDate);
		table+="</table><br/>";
		
		table+="<table>";
		table+= "<tr><td>Billing Address</td></tr>";
		table+= printJsonTableRow("billToFirstName", obj[j].billToFirstName);
		table+= printJsonTableRow("billToLastName", obj[j].billToLastName);
		table+= printJsonTableRow("billAddress1", obj[j].billAddress1);
		table+= printJsonTableRow("billAddress2", obj[j].billAddress2);
		table+= printJsonTableRow("billZip", obj[j].billZip);
		table+= printJsonTableRow("billCity", obj[j].billCity);
		table+= printJsonTableRow("billState", obj[j].billState);
		table+= printJsonTableRow("billCountry", obj[j].billCountry);
		table+="</table><br/>";
		
		table+="<table>";
		table+= "<tr><td>Shipping Address</td></tr>";
		table+= printJsonTableRow("shipToFirstName", obj[j].shipToFirstName);
		table+= printJsonTableRow("shipToLastName", obj[j].shipToLastName);
		table+= printJsonTableRow("shipAddress1", obj[j].shipAddress1);
		table+= printJsonTableRow("shipAddress2", obj[j].shipAddress2);
		table+= printJsonTableRow("shipZip", obj[j].shipZip);
		table+= printJsonTableRow("shipCity", obj[j].shipCity);
		table+= printJsonTableRow("shipState", obj[j].shipState);
		table+= printJsonTableRow("shipCountry", obj[j].shipCountry);
		table+="</table><br/>";
		
		table+="<table>";
		table+= "<tr><td>Shipping Details</td></tr>";
		table+= printJsonTableRow("courier", obj[j].courier);
		table+= printJsonTableRow("locale", obj[j].locale);
		table+= printJsonTableRow("status", obj[j].status);
		table+="</table>";
	}
	document.getElementById("niceResp").innerHTML = table;
}