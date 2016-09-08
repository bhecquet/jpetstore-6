package org.mybatis.jpetstore.soapservice;


import javax.jws.WebMethod;
import javax.jws.WebService;
import org.mybatis.jpetstore.domain.Account;

@WebService // WSDL, ex : http://localhost:8080/jpetstore/account
public interface AccountSoapInterface {

	@WebMethod(operationName = "getSecureAccount")
	public Account getSecureAccount(String username, String password); 
	  
}
