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

	private static final String conf_url_authenficate = "sonar.url.authentificate";
	private static final String conf_url_listlangage = "sonar.url.listlangage";
	private static final String conf_url_listlangage_param = "sonar.url.listlangage.param";
	private static final String conf_url = "sonar.url";
	private static final String conf_path = "/app.properties";

	public static boolean getIsAuthen() {
		String szUrl = "";
		RestTemplate restTemplate = new RestTemplate();
		
		szUrl = loadProperties().getProperty(conf_url) + loadProperties().getProperty(conf_url_authenficate) ;
		
		Sonar oSonar = restTemplate.getForObject(szUrl, Sonar.class);

		return oSonar.getValid();

	}

	public static List<Langage> getListLangage() {
		String szUrl = "";
		List<Langage> langageList = new ArrayList<Langage>();
		RestTemplate restTemplate = new RestTemplate();
		
		szUrl = loadProperties().getProperty(conf_url) + loadProperties().getProperty(conf_url_listlangage) + 
				loadProperties().getProperty(conf_url_listlangage_param);
		
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
