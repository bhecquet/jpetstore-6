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
function ajaxAnswer(method, url, mode, respContainer) {
		
		// create the request
		var xhttp = createRequest();
		
		// get the response
	    xhttp.onreadystatechange = function() {
			
			// readyState 4 : request finished and response is ready
			// status 200: "OK"
	    	if (xhttp.readyState == 4 && xhttp.status == 200) {
	    		
	    		document.getElementById(respContainer).textContent = xhttp.responseText;
	    		
	    		if (mode == "Xml") {
	    			processXmlAnswer(xhttp);
	    		}
	    		if (mode == "Json") {
	    			processJsonAnswer(xhttp);
	    		}
	   		}
	    };
	  
	  // send the request
	  if (method == "post") {
		  if (mode != null) {
			  sendPostRequest(xhttp, url + mode);
		  } else {
			  sendPostRequest(xhttp, url);
		  }
	  } else {
		  if (mode != null) {
			  sendGetRequest(xhttp, url + mode);
		  } else {
			  sendGetRequest(xhttp, url);
		  }
	  }
	  
	} 
	
	
	function createRequest() {
		if (window.XMLHttpRequest) {
			
		    return new XMLHttpRequest();
	    } else {
		    // code for IE6, IE5
		    return new ActiveXObject("Microsoft.XMLHTTP");
		}
	}