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

public class AccountRestServiceTest extends SpringContextAwareJerseyTest{
	
	@Test
    public void getAccountInformation() {

		// we could access DB bean using following code, helping us to clean it or rollback transactions if necessary
		// getContext().getBean("dataSource");
		final Form form = new Form();
        form.param("tbUsername", "j2ee");
        form.param("tbPassword", "j2ee");
		Response response = target("/accounts/getAccountJson").request().post(Entity.form(form));
		Assert.assertThat("Should return 200", response.getStatus(), is(200));
    }

	@Override
	public Class getResourcesClass() {
		return AccountResources.class;
	}
}
