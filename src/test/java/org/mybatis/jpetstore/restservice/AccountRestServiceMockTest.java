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

import static org.hamcrest.CoreMatchers.is;

import javax.ws.rs.client.Entity;
import javax.ws.rs.core.Form;
import javax.ws.rs.core.Response;

import org.junit.Assert;
import org.junit.Test;
import org.mockito.Mockito;
import org.mybatis.jpetstore.domain.Account;
import org.mybatis.jpetstore.mapper.AccountMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Conditional;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * In this class, we use Mockito to mock DB access (AccountMapper)
 * As JerseyTest starts spring which initializes its application context, we need a way to access it.
 * That's what SpringContextAwareJerseyTest is made for (storing the current context)
 * 
 * Bean declarations are used so that Spring initializes its beans using our mocked objects. Thus, AccountResources and AccountService objects
 * must have a constructor taking mocked fields.
 * 
 * @author behe
 *
 */
@Configuration
public class AccountRestServiceMockTest extends SpringContextAwareJerseyTest{

	@Conditional(AccountRestServiceMockTest.class)
    @Bean
    static public AccountMapper accountMapper() {
        return Mockito.mock(AccountMapper.class);
	}

	@Test
    public void getMockedAccountInformation() {
		
		AccountMapper mockedAccountMapper = getContext().getBean(AccountMapper.class);
		Account account = new Account("testUser", "testPwd", "test@test.com", "test", "test", "ACTIVE", "1st test street", "", "Rennes", "", "35000", "France", "", "", "", false, false, "");
		Mockito.when(mockedAccountMapper.getAccountByUsernameAndPassword("testUser", "testPwd")).thenReturn(account);
		
		final Form form = new Form();
        form.param("tbUsername", "testUser");
        form.param("tbPassword", "testPwd");
		Response response = target("/accounts/getAccountJson").request().post(Entity.form(form));
		Assert.assertThat(response.getStatus(), is(200));
		String output = response.readEntity(String.class);
		
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			
			//convert json string to object
			Account acc = objectMapper.readValue(output, Account.class);
			Assert.assertThat(acc.getAddress1(), is("1st test street"));
		} catch (Exception e) {
			Assert.fail("cannot parse JSON response to account");
		}

    }
	
	@Override
	public Class getResourcesClass() {
		return AccountResources.class;
	}

}
