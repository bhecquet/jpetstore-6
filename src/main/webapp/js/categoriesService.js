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
function getCategoriesXML(shortUrl){
	var options = ["Xml", "resp"];
	ajaxRequest("get", getRelativeUrl(shortUrl), options);
}

function getCategoriesJSON(shortUrl){
	var options = ["Json", "resp"];
	ajaxRequest("get", getRelativeUrl(shortUrl), options);
}


function sendRequest(xhttp, method, url, options) {
	
	var mode = options[0];
	
	if (mode != null && mode != "undefined") {
		sendGetRequestCategories(xhttp, url + mode);
	} else {
		sendGetRequestCategories(xhttp, url);
	}
}

function sendGetRequestCategories(xhttp, url) {
		
	document.getElementById("quest").textContent = "get all categories";
	
	sendGetRequest(xhttp, url, "");
}


function processAjaxAnswer(xhttp, method, url, options) {
	
	var mode = options[0];
	var respContainer = options[1];
	
	document.getElementById(respContainer).textContent = xhttp.responseText;
	
	if (mode == "Xml") {
		processCategoriesXmlAnswer(xhttp);
	}
	if (mode == "Json") {
		processCategoriesJsonAnswer(xhttp);
	}
}

function processCategoriesXmlAnswer(xhttp) {
	
	var xmlDoc = xhttp.responseXML;
	
	var table="<table>"
		 	+ "<tr><td>Category</td></tr>";
	var root = xmlDoc.getElementsByTagName("category");
	
	for (i=0; i < root.length; i++) {
		table+= printXmlTableRow("description", root, i);
		table+= printXmlTableRow("categoryId", root, i);
		table+= printXmlTableRow("name", root, i);
	}
		
	table+="</table>";
	document.getElementById("niceResp").innerHTML = table;
}


function processCategoriesJsonAnswer(xhttp) {
	
	var obj = JSON.parse(xhttp.responseText);	
	
	var table="<table>"
	 		+ "<tr><td>Category</td></tr>";
	
	for (i=0; i < obj.length; i++) {
		table+= printJsonTableRow("description", obj[i].description);
		table+= printJsonTableRow("categoryId", obj[i].categoryId);
		table+= printJsonTableRow("name", obj[i].name);
	}
	table+="</table>";
	document.getElementById("niceResp").innerHTML = table;
}
