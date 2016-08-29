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

window.onload = function() {
	loadCategories();
}

function loadCategories() {
	var shortUrl = '/jpetstore/jpetstoreCatalog/catalog/getCategories';
	var options = ["Json", "resp", "categories"];
	ajaxMultiRequest("get", getRelativeUrl(shortUrl), options); 
}

function loadProducts() {
	var shortUrl = '/jpetstore/jpetstoreCatalog/catalog/getProducts';
	var options = ["Json", "resp", "products"];
	ajaxMultiRequest("get", getRelativeUrl(shortUrl), options); 
}

function loadItems() {
	var shortUrl = '/jpetstore/jpetstoreCatalog/catalog/getItems';
	var options = ["Json", "resp", "items"];
	ajaxMultiRequest("get", getRelativeUrl(shortUrl), options); 
}

function showPaymentInfo() {
	show("payementDetails");
	show("billingAddress");
	show("shippingAddress");
	show("submitBtn");
}

/*******************************
 ********** BUTTONS ************
 *******************************/
function postOrderAccountJSON(shortUrl){
	var options = ["Json", "resp", "account"];
	ajaxMultiRequest("post", getRelativeUrl(shortUrl), options);
}

function selectCategory() {
	loadProducts();
}

function selectProduct() {
	loadItems();
}

function selectItem() {
	var shortUrl = '/jpetstore/jpetstoreCatalog/catalog/getItem';
	var options = ["Json", "resp", "item"];
	ajaxMultiRequest("get", getRelativeUrl(shortUrl), options); 
}

function validateItem() {
	addToContent("lineItems", getValue("selectItem") + "_" + 1 + "_" + getContent("selectedItemCost").split("$")[1] + "_");
	addToContent("itemSelectionTable", 
		"<br/><table>"
		+ "<tr><td>item Id</td><td>" + getValue("selectItem") + "</td></tr>"
		+ "<tr><td>name</td><td>" + getSelectedValue("selectProduct") + " " + getSelectedValue("selectItem") + "</td></tr>"
		+ "<tr><td>description</td><td>" + getContent("selectedItemDescription") + "</td></tr>"
		+ "<tr><td>unit cost</td><td>" + getContent("selectedItemCost") + "</td></tr>"
		+ "<tr><td>quantity</td><td>" + 1 + "</td></tr>"
		+ "</table>");
	
	show("validateItemsBtn");
}

function proceedPayement() {
	showPaymentInfo();
}

function dummyCardInfo() {
	if (document.getElementById("dummyCardInfo").checked==true) {
		
		setValue("cardType", "Visa");
		setValue("cardNumber", "999 9999 9999 9999");
		setValue("expiryDate", "12/03");
	}
}

function addressCheckbox() {
	if (document.getElementById("sameShippingAddress").checked==true) {
		
		setValue("shipToFirstName", getValue("billToFirstName"));
		setValue("shipToLastName", getValue("billToLastName"));
		setValue("shipAddress1", getValue("billAddress1"));
		setValue("shipAddress2", getValue("billAddress2"));
		setValue("shipZip", getValue("billZip"));
		setValue("shipCity", getValue("billCity"));
		setValue("shipState", getValue("billState"));
		setValue("shipCountry", getValue("billCountry"));
	}
}

function postOrder(shortUrl){
	
	setContent("submitBtn", "New Order");
	setOnclick("submitBtn", "reloadPage()");
	
	var options = ["undefined", "resp", "order"];
	ajaxMultiRequest("post", getRelativeUrl(shortUrl), options);
}

/*******************************
 ********* REQUESTS ************
 *******************************/
function sendMultiRequest(xhttp, method, url, options) {
	
	var mode = options[0];
	var subject = options[2];
	
	if (subject == "account") {
		sendPostRequestAccount(xhttp, url + mode);
		
	} else if (subject == "categories") {
		sendGetRequestCategories(xhttp, url + mode);
		
	} else if (subject == "products") {
		var categoryId = getValue("selectCategory");
		sendGetRequestProducts(xhttp, url + mode, categoryId);
		
	} else if (subject == "items") {
		var productId = getValue("selectProduct");
		sendGetRequestItems(xhttp, url + mode, productId);
		
	} else if (subject == "item") {
		var itemId = getValue("selectItem");
		sendGetRequestItem(xhttp, url + mode, itemId);
		
	} else if (subject == "order") {
		sendPostRequestOrder(xhttp, url);
	}
}

/*
 * ORDER request
 */
function sendPostRequestOrder(xhttp, url) {
		
	var pUsername = getValue("username");
	var pPassword = getValue("password");
	
	var pCardType = getValue("cardType");
	var pCardNumber = getValue("cardNumber");
	var pExpiryDate = getValue("expiryDate");
	
	var pBillToFirstName = getValue("billToFirstName");
	var pBillToLastName = getValue("billToLastName");
	var pBillAddress1 = getValue("billAddress1");
	var pBillAddress2 = getValue("billAddress2");
	var pBillZip = getValue("billZip");
	var pBillCity = getValue("billCity");
	var pBillState = getValue("billState");
	var pBillCountry = getValue("billCountry");
	
	var pShipToFirstName = getValue("shipToFirstName");
	var pShipToLastName = getValue("shipToLastName");
	var pShipAddress1 = getValue("shipAddress1");
	var pShipAddress2 = getValue("shipAddress2");
	var pShipZip = getValue("shipZip");
	var pShipCity = getValue("shipCity");
	var pShipState = getValue("shipState");
	var pShipCountry = getValue("shipCountry");
	
	var pLineItems = getContent("lineItems");
	
	setTextContent("quest", "insert order of " + pUsername);
	
	var parameters = "tbUsername="+ pUsername 
					+ "&" + "tbCardType=" + pCardType			    
					+ "&" + "tbCardNumber=" + pCardNumber
					+ "&" + "tbExpiryDate=" + pExpiryDate
					
					+ "&" + "tbBillToFirstName=" + pBillToFirstName
					+ "&" + "tbBillToLastName=" + pBillToLastName
					+ "&" + "tbBillAddress1=" + pBillAddress1
					+ "&" + "tbBillAddress2=" + pBillAddress2
					+ "&" + "tbBillZip=" + pBillZip
					+ "&" + "tbBillCity=" + pBillCity
					+ "&" + "tbBillState=" + pBillState
					+ "&" + "tbBillCountry=" + pBillCountry
					
					+ "&" + "tbShipToFirstName=" + pShipToFirstName
					+ "&" + "tbShipToLastName=" + pShipToLastName
					+ "&" + "tbShipAddress1=" + pShipAddress1
					+ "&" + "tbShipAddress2=" + pShipAddress2
					+ "&" + "tbShipZip=" + pShipZip
					+ "&" + "tbShipCity=" + pShipCity
					+ "&" + "tbShipState=" + pShipState
					+ "&" + "tbShipCountry=" + pShipCountry
	
					+ "&" + "tbOrderDate=2016-08-25T00:00:00+02:00"
					+ "&" + "tbCourier=COLISSIMO"
					+ "&" + "tbLocale=" + pShipState
					+ "&" + "tbStatus=P"
					
					+ "&" + "tbLineItems=" + pLineItems;
	
	sendPostRequest(xhttp, url, parameters);
}

/*******************************
 ********** ANSWERS ************
 *******************************/
function processAjaxMultiAnswer(xhttp, method, url, options) {
	
	var mode = options[0];
	var respContainer = options[1];
	var subject = options[2];
	
	setTextContent(respContainer, xhttp.responseText);
	
	if (subject == "account" && mode == "Json") {
		processAccountJsonAnswer(xhttp);
		processOrderAccountJsonAnswer(xhttp);
		
	} else if (subject == "categories" && mode == "Json") {
		processCategoriesJsonAnswer(xhttp);
		processOrderCategoriesJsonAnswer(xhttp);
		
	} else if (subject == "products" && mode == "Json") {
		processProductsJsonAnswer(xhttp);
		processOrderProductsJsonAnswer(xhttp);
		
	} else if (subject == "items" && mode == "Json") {
		processItemsJsonAnswer(xhttp);
		processOrderItemsJsonAnswer(xhttp);
		
	} else if (subject == "item" && mode == "Json") {
		processItemJsonAnswer(xhttp);
		processOrderItemJsonAnswer(xhttp);
		
	} else if (subject == "order") {
		processAnswerOrder(xhttp);
		
	} else {
		debbugWrite("processAjaxMultiAnswer : unknown parameters : subject = " + subject + " ; mode = " + mode)
	}
}

/*
 * ACCOUNT answer
 */
function processOrderAccountJsonAnswer(xhttp) {
	
	var obj = JSON.parse(xhttp.responseText);	
	
	if (obj.username != "undefined") {
		
		setValue("billToFirstName", obj.firstName);
		setValue("billToLastName", obj.lastName);
		setValue("billAddress1", obj.address1);
		setValue("billAddress2", obj.address2);
		setValue("billZip", obj.zip);
		setValue("billCity", obj.city);
		setValue("billState", obj.state);
		setValue("billCountry", obj.country);
		
		setValue("shipToFirstName", obj.firstName);
		setValue("shipToLastName", obj.lastName);
		setValue("shipAddress1", obj.address1);
		setValue("shipAddress2", obj.address2);
		setValue("shipZip", obj.zip);
		setValue("shipCity", obj.city);
		setValue("shipState", obj.state);
		setValue("shipCountry", obj.country);
		
		show("selectItems");
	}
}

/*
 * CATEGORIES answer
 */
function processOrderCategoriesJsonAnswer(xhttp) {
	
	var obj = JSON.parse(xhttp.responseText);
	
	for (i=0; i < obj.length; i++) {
		addToContent("selectCategory",  
			'<option value="' + obj[i].categoryId + '">' 
			+ obj[i].name 
			+ '</option>');
	}
	setContent("selectProduct", '<option value="productId">-- select product --</option>');
	setContent("selectItem", '<option value="itemId">-- select item --</option>');
}

/*
 * PRODUCTS answer
 */
function processOrderProductsJsonAnswer(xhttp) {
	
	var obj = JSON.parse(xhttp.responseText);
	
	setContent("selectProduct", '<option value="productId">-- select product --</option>');
	setContent("selectItem", '<option value="itemId">-- select item --</option>');
	
	for (i=0; i < obj.length; i++) {
		addToContent("selectProduct",  
			'<option value="' + obj[i].productId + '">' 
			+ obj[i].name 
			+ '</option>');
	}
	show("selectProduct");
}

/*
 * ITEMS answer
 */
function processOrderItemsJsonAnswer(xhttp) {
	
	var obj = JSON.parse(xhttp.responseText);
	
	setContent("selectItem", '<option value="itemId">-- select item --</option>');
	
	for (i=0; i < obj.length; i++) {
		
		obj[i].product.description
		
		addToContent("selectItem", 
			'<option value="' + obj[i].itemId + '">' 
			+ obj[i].attribute1 
			+ ' : $' + obj[i].unitCost
			+ '</option>');
	}
	show("selectItem");
}

/*
 * ITEM answer
 */
function processOrderItemJsonAnswer(xhttp) {
	
	var obj = JSON.parse(xhttp.responseText);
	
	setContent("selectedItemDescription", obj.product.description);
	
	setContent("selectedItemCost", '$' + obj.unitCost);
	
	show("validateItemBtn");
}

/*
 * ORDER answer
 */
function processAnswerOrder(xhttp) {
	
	setContent("niceResp", xhttp.responseText);
	show("orderResp");
}
