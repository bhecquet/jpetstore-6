JPetStore Web Service
=================

The JPetStore has 3 services : 
* Account : to register, sign in.
* Catalog : to consult available products.
* Order : to order products.

---

1) Consume The SOAP Web Service 
-------------------------------

The WDSL (XML file) describe the methods interacting with the JPetStore.

* /jpetstore/account?wsdl
* /jpetstore/catalog?wsdl
* /jpetstore/order?wsdl

### SOAP Web Client

No client has been developped yet.

---

2) Consume The REST Web Service 
-------------------------------

Depending on the request sent, the user can get data in XML or JSON format.

* _Account_  

/jpetstore/jpetstoreAccount/accounts/**getAccount** + Xml OR Json (POST)  
/jpetstore/jpetstoreAccount/accounts/**insertAccount** + Xml OR Json (POST)  
/jpetstore/jpetstoreAccount/accounts/**updateAccount** + Xml OR Json (POST)  

* _Catalog_  

/jpetstore/jpetstoreAccount/catalog/**getCategory** + Xml OR Json (GET)  
/jpetstore/jpetstoreAccount/catalog/**getCategories** + Xml OR Json (GET)  
/jpetstore/jpetstoreAccount/catalog/**getProduct** + Xml OR Json (GET)  
/jpetstore/jpetstoreAccount/catalog/**searchProduct** + Xml OR Json (GET)  
/jpetstore/jpetstoreAccount/catalog/**getItem** + Xml OR Json (GET)  
/jpetstore/jpetstoreAccount/catalog/**getItems** + Xml OR Json (GET)  
/jpetstore/jpetstoreAccount/catalog/**checkItem** + Xml OR Json (GET)  

* _Order_  

/jpetstore/jpetstoreAccount/orders/**getOrder** + Xml OR Json (GET)  
/jpetstore/jpetstoreAccount/orders/**getOrders** + Xml OR Json (GET)  
/jpetstore/jpetstoreAccount/orders/**insertOrder** + Xml OR Json (POST)  

### REST Web Client

An example web client is available at  
/jpetstore/rstest.html

---

3) SOAP Implementation in the application
-----------------------------------------

## 3.1) pom.xml

		<!-- SOAP web service -->
		<dependency>
			<groupId>org.apache.axis2</groupId>
			<artifactId>axis2-jaxws</artifactId>
			<version>1.7.1</version>
		</dependency>
		<!-- GlassFish (generate the web service from JaxWS) -->
		<dependency>
			<groupId>org.glassfish.web</groupId>
			<artifactId>el-impl</artifactId>
			<version>2.2</version>
		</dependency>


## 3.2) Model (domain)

The basic model has been modified in order to been convertible into an XML file.

 * @XmlRootElement(name="modelName")  
 is injected in the class itself.
 
 * @XmlElement  
 is injected in the class setter's properties.


## 3.3) Service Package

The classes of the service package have been modified, so the web service directly calls to them.

* @WebService  
is injected in the class itself.

* @WebMethod
is injected in each exposed method.

## 3.4) web.xml

In order to create the web service servlets, a listener is added. 

		<!-- WebService with JAX-WS -->
		<listener>
		    <listener-class>
				com.sun.xml.ws.transport.http.servlet.WSServletContextListener
		     </listener-class>
		</listener>

Then, each resource is declared.

		<servlet>
		    <servlet-name>resourceName</servlet-name>
		    <servlet-class>
				com.sun.xml.ws.transport.http.servlet.WSServlet
		      </servlet-class>
		    <load-on-startup>1</load-on-startup>
		</servlet>
		<servlet-mapping>
		    <servlet-name>resourceName</servlet-name>
		    <url-pattern>/resourcePath</url-pattern>
		</servlet-mapping>

Additionally, a file "sun-jaxws.xml" is needed to declare the end points :

		<endpoints
		  xmlns="http://java.sun.com/xml/ns/jax-ws/ri/runtime"
		  version="2.0">
		  
		  <endpoint
		      name="ResourceService"
		      implementation="org.mybatis.jpetstore.service.AccountService"
		      url-pattern="/resourcePath"/>
		  
		  <!-- other endpoints -->
		  
		</endpoints> 

---

4) REST Implementation in the application
-----------------------------------------

## 4.1) pom.xml

In the dependencies, add the following :  

To allow Jax-RS annotations :

		<dependency>
			<groupId>javax.ws.rs</groupId>
			<artifactId>javax.ws.rs-api</artifactId>
			<version>2.0</version>
		</dependency>

To use Jersey (from the GlassFish project) to provide XML :
		
		<dependency>
		    <groupId>org.glassfish.jersey.containers</groupId>
		    <artifactId>jersey-container-servlet</artifactId>
		    <version>2.23.2</version>
		</dependency>
		
Since the JPetStore injects its DAO with Spring :
		
		<dependency>
		    <groupId>org.glassfish.jersey.ext</groupId>
		    <artifactId>jersey-spring3</artifactId>
		    <version>2.23.2</version>
		</dependency>
		
Jackson enables the use of JSON :
		
		<dependency>
		    <groupId>org.glassfish.jersey.media</groupId>
		    <artifactId>jersey-media-json-jackson</artifactId>
		    <version>2.23.2</version>
		</dependency>
		<dependency>
		    <groupId>org.glassfish.jersey.media</groupId>
		    <artifactId>jersey-media-moxy</artifactId>
		    <version>2.23.2</version>
		</dependency>
		<!-- enable JSON with JXB annotation -->
		<dependency>
		  <groupId>com.fasterxml.jackson.module</groupId>
		  <artifactId>jackson-module-jaxb-annotations</artifactId>
		  <version>2.4.0</version>
		</dependency>

Note a **trick with GlassFish 4.1.1** : 
In "glassfish/modules/org.eclipse.persistence.moxy.jar", modify the META-INF/MANIFEST.MF 
Append the following to Import-Package (before "Bundle-ManifestVersion: 2") :
_,org.xml.sax.helpers,javax.xml.parsers;resolution:=optional,javax.naming;resolution:=optional_

## 4.2) Model (domain)

The basic model has been modified in order to been convertible into an XML of JSON file.

 * @XmlRootElement(name="modelName")  
 is injected in the class itself.
 
 * @JsonProperty  
 is injected in the class property.
 
 * @XmlElement  
 is injected in the class setter's properties.

## 4.3) Restservice Package

The "restservice" package contains the following :

* The **RestApp** classes : 
These are the entry points of the web service. Each are constructed with the requested Ressources and the ObjectProvider classes.

* The **Resources** classes : 
These classes communicate with the Service to communicate with the database.

* The JSON and XML **ObjectProvider** class : 
This class is called when the client calls a Resources method which either "Consumes"
or "Provides" an XML or JSON object. The ObjectProvider converts the object in the requested format.

## 4.4) html

Inside the "webapp" directory is the index of the REST web client, 
which directs to the method specific pages in the "rstest" directory.

---

5) Install in Tomcat
-----------------------------------------

For application to start on Tomcat (tested on tomcat8), you must:
- download JAX-WS RI from http://jax-ws.java.net/
- copy jaxws-rt.jar into <TOMCAT_HOME>/lib
- create folder <TOMCAT_HOME>/endorsed
- copy gmbal-api-only.jar, ha-api.jar, jaxb-core.jar, jaxb-impl.jar, management-api.jar, policy.jar, stax-ex.jar, streambuffer.jar into <TOMCAT_HOME>/endorsed
- in pom.xml, exclude jsr311 artifact from axis api
	<dependency>
		<groupId>org.apache.axis2</groupId>
		<artifactId>axis2-jaxws</artifactId>
		<version>1.7.1</version>
		<exclusions>
			<exclusion>
				<groupId>javax.ws.rs</groupId>
				<artifactId>jsr311-api</artifactId>
			</exclusion>
		</exclusions>
	</dependency>

---

6) Debug in eclipse
-----------------------------------------
see: http://blogs.mulesoft.com/dev/tomcat-tcat-server/debugging-your-tomcat-webapp-with-eclipse/