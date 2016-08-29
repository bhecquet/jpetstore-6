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

function printXmlTableRow(item, elem, index) {
	if (elem.length > index) {
		if (elem[index].getElementsByTagName(item).length > 0) {
			return "<tr><td>" + item + "</td><td>" + elem[index].getElementsByTagName(item)[0].childNodes[0].nodeValue + "</td></tr>"
		}
	}
	return "<tr><td>" + item + "</td><td>undefined</td></tr>"
}

function printJsonTableRow(item, value) {
	return "<tr><td>" + item + "</td><td>" + value + "</td></tr>"
}