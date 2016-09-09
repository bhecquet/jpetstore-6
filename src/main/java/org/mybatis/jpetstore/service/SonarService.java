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
package org.mybatis.jpetstore.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.mybatis.jpetstore.domain.Langage;
import org.mybatis.jpetstore.domain.Sonar;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;


public class SonarService {

	private static final String conf_url_authenticate = "sonar.url.authenticate";
	private static final String conf_url_listlangage = "sonar.url.listlangage";
	private static final String conf_url_listlangage_param = "sonar.url.listlangage.param";
	private static final String conf_url = "sonar.url";
	private static final String conf_path = "/app.properties";

	public static boolean getIsAuthen() {
		String szUrl = "";
		RestTemplate restTemplate = new RestTemplate();
		
		szUrl = loadProperties().getProperty(conf_url) + loadProperties().getProperty(conf_url_authenticate) ;
		
		Sonar oSonar = restTemplate.getForObject(szUrl, Sonar.class);

		return oSonar.getValid();

	}
	
	/**
	 * replaces "sonar." by "sonar.mock." when mock is true in the keyString
	 * @param keyString
	 * @param mocked
	 * @return
	 */
	private static String getConfKeyString(String keyString, boolean mocked) {
		return mocked ? keyString.replace("sonar.", "sonar.mock."): keyString;
	}

	public static List<Langage> getListLangage(boolean mocked) {
		String szUrl = "";
		List<Langage> langageList = new ArrayList<Langage>();
		RestTemplate restTemplate = new RestTemplate();
		Properties props = loadProperties();
		
		szUrl = props.getProperty(getConfKeyString(conf_url, mocked)) 
				+ props.getProperty(getConfKeyString(conf_url_listlangage, mocked)) 
				+ props.getProperty(getConfKeyString(conf_url_listlangage_param, mocked));
		
		// replace possible env variables
		if (System.getenv("SONAR_HOST") != null) {
			szUrl = szUrl.replace("$SONAR_HOST$", System.getenv("SONAR_HOST"));
		}
		if (System.getenv("SONAR_MOCK_HOST") != null) {
			szUrl = szUrl.replace("$SONAR_MOCK_HOST$", System.getenv("SONAR_MOCK_HOST"));
		}
		
		ResponseEntity<String> response = restTemplate.getForEntity(szUrl, String.class);

		ObjectMapper mapper = new ObjectMapper();
		JsonNode root;
		try {
			root = mapper.readTree(response.getBody());
			JsonNode languages = root.path("languages");

			if (languages.isArray()) {

				for (JsonNode node : languages) {
					Langage oLangage = new Langage();
					oLangage.setKey(node.path("key").asText());
					oLangage.setName(node.path("name").asText());

					langageList.add(oLangage);
				}
			}
		} catch (JsonProcessingException e) {
			langageList.clear();
			langageList = null;
			e.printStackTrace();
		} catch (IOException e) {
			langageList.clear();
			langageList = null;
			e.printStackTrace();
		}

		return langageList;
	}

	private static Properties loadProperties() {
		Resource resource = new ClassPathResource(conf_path);
		Properties props = null;
		try {
			props = PropertiesLoaderUtils.loadProperties(resource);

		} catch (IOException e1) {
			props = null;
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		return props;
	}

}
