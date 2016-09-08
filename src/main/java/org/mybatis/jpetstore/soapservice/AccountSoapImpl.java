package org.mybatis.jpetstore.soapservice;

import javax.jws.WebMethod;
import javax.jws.WebService;
import org.apache.ibatis.session.SqlSession;
import org.mybatis.jpetstore.domain.Account;
import org.mybatis.jpetstore.mapper.AccountMapper;
import java.io.IOException;



@WebService(endpointInterface="org.mybatis.jpetstore.soapservice.AccountSoapInterface")
public class AccountSoapImpl implements AccountSoapInterface {
	
	@Override
	@WebMethod
	public Account getSecureAccount(String username, String password) {
		Account oAccount = null;
		SqlSession session = null;

		try {

			session = SoapUtils.CreateSQLSession();
			
			AccountMapper oMap =  session.getMapper(AccountMapper.class);
			oAccount = oMap.getAccountByUsernameAndPassword(username, password);
					
		} catch (IOException e) {
			
		}
		finally {
			if(session != null)
				SoapUtils.DeleteSQLSession(session);
		}
		

		return oAccount;
	}

}
