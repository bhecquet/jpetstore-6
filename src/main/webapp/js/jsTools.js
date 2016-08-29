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
function handleError() {
	console.log(msg);
	document.getElementById("debbugField").innerHTML += "<br/><span style=\"color: red;\">JS error happened.</span><br/>";
	document.getElementById("debbugDiv").style = "visibility:visible;";
}

/*
 * <div id="debbugDiv" style="visibility: hidden; color: red;"><fieldset id="debbugField"></fieldset></div>
 */
function debbugWrite(msg) {
	console.log(msg);
	document.getElementById("debbugField").innerHTML += "<span style=\"color: black;\">" + msg + "</span><br/>";
	document.getElementById("debbugDiv").style = "visibility:visible;";
}

function reloadPage() {
	goToTop();
	location.reload();
}

/*
 * inner HTML
 */
function getContent(elemId) {
	return document.getElementById(elemId).innerHTML;
}

function setContent(elemId, givenValue) {
	document.getElementById(elemId).innerHTML = givenValue;
}

function addToContent(elemId, givenValue) {
	document.getElementById(elemId).innerHTML += givenValue;
}

/*
 * text content
 */
function getTextContent(elemId) {
	return document.getElementById(elemId).textContent;
}

function setTextContent(elemId, givenValue) {
	document.getElementById(elemId).textContent = givenValue;
}

function getSelectedValue(elemId) {
	var elem = document.getElementById(elemId);
	return elem.options[elem.selectedIndex].text;
}

/*
 * value
 */
function getValue(elemId) {
	return document.getElementById(elemId).value;
}

function setValue(elemId, givenValue) {
	document.getElementById(elemId).value = givenValue;
}

/*
 * onclick
 */
function getOnclick(elemId) {
	return document.getElementById(elemId).onclick;
}

function setOnclick(elemId, givenValue) {
	//document.getElementById(elemId).onclick = function(){ /*do something here*/ };
	document.getElementById(elemId).setAttribute('onclick', givenValue);
}

/*
 * style
 */
function show(elemId) {
	document.getElementById(elemId).style="visibility:visible";
}

function hide(elemId) {
	document.getElementById(elemId).style="visibility:hidden";
}

function goToTop() {
	window.scrollTo(0, 0);
}


