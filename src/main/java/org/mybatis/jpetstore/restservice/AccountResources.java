/**
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
package org.mybatis.jpetstore.restservice;

import java.net.URI;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.mybatis.jpetstore.domain.Account;
import org.mybatis.jpetstore.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Path("/accounts")
public class AccountResources {
		
	// DB communication tool
	@Autowired
	private AccountService accountService;
	
	public AccountResources() {}
	
	@POST
	@Path("/getAccountXml")
    @Produces(MediaType.APPLICATION_XML)
	public Account getAccountXml(@FormParam("tbUsername") String username, 
							  @FormParam("tbPassword") String password) {
		
		System.out.println("REST webservice : getAccount of " + username);
		Account acc = accountService.getSecureAccount(username, password);
		acc.setFirstName("PROVIDER OKAY");
		return acc;
	}
	@POST
	@Path("/getAccountJson")
    @Produces(MediaType.APPLICATION_JSON)
	public Account getAccountJson(@FormParam("tbUsername") String username, 
							  @FormParam("tbPassword") String password) {
		
		System.out.println("REST webservice : getAccount of " + username);
		
		return accountService.getSecureAccount(username, password);
	}
	
	@POST
	@Path("/insertAccount")
	@Produces(MediaType.TEXT_HTML)
	public Response insertAccount(@FormParam("tbUsername") String username, 
			  					  @FormParam("tbPassword") String password, 
			  					  @FormParam("tbFirstname") String firstName, 
								  @FormParam("tbLastname") String lastName,
								  @FormParam("tbEmail") String email, 
								  @FormParam("tbPhone") String phone, 
								  @FormParam("tbAddress1") String address1, 
								  @FormParam("tbAddress2") String address2, 
								  @FormParam("tbCity") String city, 
								  @FormParam("tbState") String state, 
								  @FormParam("tbZip") String zip, 
								  @FormParam("tbCountry") String country, 
								  @FormParam("tbLanguage") String languagePreference, 
								  @FormParam("tbCategory") String favouriteCategoryId, 
								  @FormParam("tbEnableList") boolean listOption, 
								  @FormParam("tbEnableBanner") boolean bannerOption) {
		
		System.out.println("REST webservice : insertAccount of " + username);
		
		Account account = accountService.getAccount(username);
		
		String output;
		if (account == null) { 
			account = new Account(username, password, email, firstName, lastName, "", address1, address2, city, state, zip, country, phone, favouriteCategoryId, languagePreference, listOption, bannerOption, "");
			accountService.insertAccount(account);
		    output = "Account successfully created ! <br/> <a href='/jpetstore/rstest.html'>test more service</a>";
		} else {
			output = "Account " + username + " already exists. <br/>"
					+ "go to <a href='/jpetstore/rstest/UpdateAccount.html'>update</a><br/>"
					+ "<a href='/jpetstore/rstest.html'>test more service</a>";
		}
	    URI location = URI.create("");
	    
	    return Response.created(location).entity(output).build();
	}
	
	@POST
	@Path("/updateAccount")
	@Produces(MediaType.TEXT_HTML)
	public Response updateAccount(@FormParam("tbUsername") String username, 
								  @FormParam("tbPassword") String password, 
								  @FormParam("tbFirstname") String firstName, 
								  @FormParam("tbLastname") String lastName,
								  @FormParam("tbEmail") String email, 
								  @FormParam("tbPhone") String phone, 
								  @FormParam("tbAddress1") String address1, 
								  @FormParam("tbAddress2") String address2, 
								  @FormParam("tbCity") String city, 
								  @FormParam("tbState") String state, 
								  @FormParam("tbZip") String zip, 
								  @FormParam("tbCountry") String country, 
								  @FormParam("tbLanguage") String languagePreference, 
								  @FormParam("tbCategory") String favouriteCategoryId, 
								  @FormParam("tbEnableList") boolean listOption, 
								  @FormParam("tbEnableBanner") boolean bannerOption) {
		
		System.out.println("REST webservice : updateAccount of " + username);
		Account account = accountService.getAccount(username);
		
		String output;
		if (account != null) { 
			account.setPassword(password);
			account.setFirstName(firstName);
			account.setLastName(lastName);
			account.setEmail(email);
			account.setPhone(phone);
			account.setAddress1(address1);
			account.setAddress2(address2);
			account.setCity(city);
			account.setState(state);
			account.setZip(zip);
			account.setCountry(country);
			account.setLanguagePreference(languagePreference);
			account.setFavouriteCategoryId(favouriteCategoryId);
			account.setListOption(listOption);
			account.setBannerOption(bannerOption);
			
			accountService.updateAccount(account);
				    
			output = "Account successfully modified ! <br/> <a href='/jpetstore/rstest.html'>test more service</a>";
		} else {
			output = "Account of " + username + " could not be found. <br/> <a href='/jpetstore/rstest.html'>test more service</a>";
		}
	    URI location = URI.create("");
	    
	    return Response.created(location).entity(output).build();
	}

}
