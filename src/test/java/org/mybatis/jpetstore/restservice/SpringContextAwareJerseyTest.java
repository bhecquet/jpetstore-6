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

import javax.ws.rs.core.Application;

import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.test.JerseyTest;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Rule;
import org.junit.rules.TestName;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Condition;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.type.AnnotatedTypeMetadata;
import org.springframework.core.type.classreading.MethodMetadataReadingVisitor;

/**
 * A utility class which allows us to access the application context hidden in
 * Jersey's test servlet container. All the JAX-RS resource tests should inherit
 * from this class.
 *
 */
@Configuration
public class SpringContextAwareJerseyTest extends JerseyTest implements Condition {

    final private static ThreadLocal<ApplicationContext> context = new ThreadLocal();
    final private static ThreadLocal<Class> testClass = new ThreadLocal();

	public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
		return testClass.get().getName().equals(((MethodMetadataReadingVisitor)metadata).getDeclaringClassName());
	}

    @Override
	public Application configure() {
    	
    	// set test class only once. It's the caller test which set it.
    	// configure may be called on Bean init
    	if (testClass.get() == null) {
    		testClass.set(this.getClass());
    	}
	    return new ResourceConfig(AccountResources.class)
	    		.property("contextConfigLocation", "classpath:WEB-INF/applicationContext.xml");
	}

    protected final ApplicationContext getContext() {
        return context.get();
    }
  
    @Bean
    public static ContextHolder contextHolder() {
        return new ContextHolder();
    }

    private static class ContextHolder implements ApplicationContextAware {
        @Override
        public void setApplicationContext(ApplicationContext applicationContext)
            throws BeansException {
            context.set(applicationContext);
        }
    }
    
    @AfterClass
    public static void finalizeTest() {
    	testClass.remove();
    }
}
