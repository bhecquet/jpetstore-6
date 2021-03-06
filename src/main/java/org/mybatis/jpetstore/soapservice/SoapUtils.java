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

import java.io.IOException;
import java.io.Reader;
import java.util.Properties;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

public class SoapUtils {
	
	private static final String conf_key = "mybatis.config";
	private static final String conf_path = "/app.properties";

	public static SqlSession CreateSQLSession() throws IOException {
		Reader reader = null;
		String szConfResource = "";
		SqlSession session = null;
		SqlSessionFactory sessionFactory = null;
		
		SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
		
		Resource resource = new ClassPathResource(conf_path);
		Properties props = PropertiesLoaderUtils.loadProperties(resource);
		szConfResource = props.getProperty(conf_key);
			
		reader = Resources.getResourceAsReader(szConfResource);
		sessionFactory = builder.build(reader);
	
		session = sessionFactory.openSession();
		
		return session;
		
	}

	public static void DeleteSQLSession(SqlSession oSession) {
		oSession.close();
	}
}
