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

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.mybatis.jpetstore.domain.Category;
import org.mybatis.jpetstore.domain.Product;
import org.mybatis.jpetstore.service.CatalogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Path("/catalog")
public class CatalogResources {

	// DB communication tool
	@Autowired
	private CatalogService catalogService;
	
	public CatalogResources() {}
	
	
	@GET
	@Path("/getCategoryXml")
    @Produces(MediaType.APPLICATION_XML)
	public Category getCategoryXml(@QueryParam("tbCategoryId") String categoryId){
		
		System.out.println("REST webservice : getCategory #" + categoryId);
		
		Category category = catalogService.getCategory(categoryId);
		if (category == null) {
			category = new Category();
		}
		return category;
	}
	
	@GET
	@Path("/getCategoryJson")
    @Produces(MediaType.APPLICATION_JSON)
	public Category getCategoryJson(@QueryParam("tbCategoryId") String categoryId){
		
		System.out.println("REST webservice : getCategory #" + categoryId);
		
		Category category = catalogService.getCategory(categoryId);
		if (category == null) {
			category = new Category();
		}
		return category;
	}
	
	
	@GET
	@Path("/getCategoriesXml")
    @Produces(MediaType.APPLICATION_XML)
	public List<Category> getCategoriesXml(@QueryParam("tbCategoryId") String categoryId){
		
		System.out.println("REST webservice : getCategory #" + categoryId);
		
		return catalogService.getCategoryList();
	}
	
	
	@GET
	@Path("/getCategoriesJson")
    @Produces(MediaType.APPLICATION_JSON)
	public List<Category> getCategoriesJson(@QueryParam("tbCategoryId") String categoryId){
		
		System.out.println("REST webservice : getCategory #" + categoryId);
		
		return catalogService.getCategoryList();
	}
	
	
	@GET
	@Path("/getProductXml")
    @Produces(MediaType.APPLICATION_XML)
	public Product getProductXml(@QueryParam("tbProductId") String productId){
		
		System.out.println("REST webservice : getProduct #" + productId);
		
		Product product = catalogService.getProduct(productId);
		if (product == null) {
			product = new Product();
		}
		return product;
	}
	
	@GET
	@Path("/getProductJson")
    @Produces(MediaType.APPLICATION_JSON)
	public Product getProductJson(@QueryParam("tbProductId") String productId){
		
		System.out.println("REST webservice : getProduct #" + productId);
		
		Product product = catalogService.getProduct(productId);
		if (product == null) {
			product = new Product();
		}
		return product;
	}
	
	
	@GET
	@Path("/getProductsXml")
    @Produces(MediaType.APPLICATION_XML)
	public List<Product> getProductsXml(@QueryParam("tbCategoryId") String categoryId){
		
		System.out.println("REST webservice : get Products from category #" + categoryId);
				
		return catalogService.getProductListByCategory(categoryId);
	}
	
	@GET
	@Path("/getProductsJson")
    @Produces(MediaType.APPLICATION_JSON)
	public List<Product> getProductsJson(@QueryParam("tbCategoryId") String categoryId){
		
		System.out.println("REST webservice : get Products from category #" + categoryId);
		
		return catalogService.getProductListByCategory(categoryId);
	}
	
	
	@GET
	@Path("/searchProductsXml")
    @Produces(MediaType.APPLICATION_XML)
	public List<Product> searchProductsXml(@QueryParam("tbKeywords") String keywords){
		
		System.out.println("REST webservice : search for Product with" + keywords);
				
		return catalogService.searchProductList(keywords);
	}
	
	@GET
	@Path("/searchProductsJson")
    @Produces(MediaType.APPLICATION_JSON)
	public List<Product> searchProductsJson(@QueryParam("tbKeywords") String keywords){
		
		System.out.println("REST webservice : search for Product with" + keywords);
				
		return catalogService.searchProductList(keywords);
	}
}
