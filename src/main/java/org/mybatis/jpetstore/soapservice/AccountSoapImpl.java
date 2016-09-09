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
