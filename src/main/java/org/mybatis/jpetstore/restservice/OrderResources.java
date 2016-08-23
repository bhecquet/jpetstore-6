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

import java.net.URI;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.mybatis.jpetstore.domain.Order;
import org.mybatis.jpetstore.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Path("/orders")
public class OrderResources {

	// DB communication tool
	@Autowired
	private OrderService orderService;
	
	public OrderResources() {}
	
	@GET
	@Path("/getOrderXml")
    @Produces(MediaType.APPLICATION_XML)
	public Order getOrderXml(@QueryParam("tbOrderId") int orderId) {
		System.out.println("REST webservice : getOrder #" + orderId);
		Order order = orderService.getOrder(orderId);
		if(order == null) {
			order = new Order();
		}
		return order;
	}
	
	@GET
	@Path("/getOrderJson")
    @Produces(MediaType.APPLICATION_JSON)
	public Order getOrderJson(@QueryParam("tbOrderId") int orderId) {
		System.out.println("REST webservice : getOrder #" + orderId);
		Order order = orderService.getOrder(orderId);
		if(order == null) {
			order = new Order();
		}
		return order;
	}
	
	
	@GET
	@Path("/getOrdersXml")
    @Produces(MediaType.APPLICATION_XML)
	public List<Order> getOrdersByUsernameXml(@QueryParam("tbUsername") String username) {
		System.out.println("REST webservice : getOrders of " + username);
		return orderService.getOrdersByUsername(username);
	}
	
	@GET
	@Path("/getOrdersJson")
    @Produces(MediaType.APPLICATION_JSON)
	public List<Order> getOrdersByUsernameJson(@QueryParam("tbUsername") String username) {
		System.out.println("REST webservice : getOrders of " + username);
		return orderService.getOrdersByUsername(username);
	}
	
	
	@POST
	@Path("/insertOrderXml")
	@Consumes(MediaType.APPLICATION_XML)
    @Produces(MediaType.TEXT_HTML)
	public Response insertOrderXml(Order order) {
		
		System.out.println("REST webservice : insertOrder of " + order.getUsername());
		
		orderService.insertOrder(order);
		
		String output = "Orser successfully created ! <br/> <a href='/jpetstore/rstest.html'>test more service</a>";
	    URI location = URI.create("");
	    
	    return Response.created(location).entity(output).build();
	}
	
	@POST
	@Path("/insertOrderJson")
	@Consumes(MediaType.APPLICATION_XML)
    @Produces(MediaType.TEXT_HTML)
	public Response insertOrderJson(Order order) {
		
		System.out.println("REST webservice : insertOrder of " + order.getUsername());
		
		orderService.insertOrder(order);
		
		String output = "Orser successfully created ! <br/> <a href='/jpetstore/rstest.html'>test more service</a>";
	    URI location = URI.create("");
	    
	    return Response.created(location).entity(output).build();
	}
}
