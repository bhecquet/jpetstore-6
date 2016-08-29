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

import java.math.BigDecimal;
import java.net.URI;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import org.mybatis.jpetstore.domain.LineItem;
import org.mybatis.jpetstore.domain.Order;
import org.mybatis.jpetstore.service.CatalogService;
import org.mybatis.jpetstore.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonProperty;

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
	@Path("/insertOrder")
    @Produces(MediaType.TEXT_HTML)
	public Response insertOrder(@FormParam("tbUsername") String username,
								//@FormParam("tbOrderDate") String pOrderDate,
								@FormParam("tbShipAddress1") String shipAddress1,
								@FormParam("tbShipAddress2") String shipAddress2,
								@FormParam("tbShipCity") String shipCity,
								@FormParam("tbShipState") String shipState,
								@FormParam("tbShipZip") String shipZip,
								@FormParam("tbShipCountry") String shipCountry,
								@FormParam("tbBillAddress1") String billAddress1,
								@FormParam("tbBillAddress2") String billAddress2,
								@FormParam("tbBillCity") String billCity,
								@FormParam("tbBillState") String billState,
								@FormParam("tbBillZip") String billZip,
								@FormParam("tbBillCountry") String billCountry,
								@FormParam("tbCourier") String courier,
								// @FormParam("tbTotalPrice") BigDecimal totalPrice,
								@FormParam("tbBillToFirstName") String billToFirstName,
								@FormParam("tbBillToLastName") String billToLastName,
								@FormParam("tbShipToFirstName") String shipToFirstName,
								@FormParam("tbShipToLastName") String shipToLastName,
								@FormParam("tbCardType") String cardType,
								@FormParam("tbCardNumber") String cardNumber,
								@FormParam("tbExpiryDate") String expiryDate,
								@FormParam("tbLocale") String locale,
								@FormParam("tbStatus") String status, 
								@FormParam("tbLineItems") String pLineItems) {
		
		System.out.println("REST webservice : insertOrder of " + username);
		
		Order order = new Order();
		order.setUsername(username);
		
		String pOrderDate = "2016-08-25T00:00:00+02:00";
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
		try {
			Date orderDate = formatter.parse(pOrderDate);
			System.out.println(orderDate);
			order.setOrderDate(orderDate);
		} catch (ParseException e1) {
			e1.printStackTrace();
		}
        
		order.setShipAddress1(shipAddress1);
		order.setShipAddress2(shipAddress2);
		order.setShipCity(shipCity);
		order.setShipState(shipState);
		order.setShipZip(shipZip);
		order.setShipCountry(shipCountry);
		order.setBillAddress1(billAddress1);
		order.setBillAddress2(billAddress2);
		order.setBillCity(billCity);
		order.setBillState(billState);
		order.setBillZip(billZip);
		order.setBillCountry(billCountry);
		order.setCourier(courier);
		
		order.setBillToFirstName(billToFirstName);
		order.setBillToLastName(billToLastName);
		order.setShipToFirstName(shipToFirstName);
		order.setShipToLastName(shipToLastName);
		order.setCreditCard(cardNumber);
		order.setExpiryDate(expiryDate);
		order.setCardType(cardType);
		order.setLocale(locale);
		order.setStatus(status);
		
		Integer calcPrice = 0;
		String[] words = pLineItems.split("_");
		for (int i = 0; i < words.length; i++) {
			
			LineItem lineItem = new LineItem();
			
			String itemId = words[i];
			lineItem.setItemId(itemId);
			
			i++;
			int quantity =  Integer.parseInt(words[i]);
			lineItem.setQuantity(quantity);
			
			i++;
			int unitCost =  Integer.parseInt(words[i]);
			BigDecimal unitPrice = new BigDecimal(String.valueOf(unitCost*quantity));
			lineItem.setUnitPrice(unitPrice);
			
			lineItem.setLineNumber((i+1)/3);
			
			order.addLineItem(lineItem);
			
			calcPrice +=  unitCost*quantity;
		}
		
		BigDecimal totalPrice = new BigDecimal(String.valueOf(calcPrice));
		order.setTotalPrice(totalPrice);
		
		String output;
		try {
			int orderId = orderService.insertOrder(order);
			output = "Order #" + orderId + " successfully created ! <br/><br/> <a href='/jpetstore/rstest.html'>test more service</a>";
		
		} catch (Exception e) {
			output = "Could not create order. <br/><br/> <a href='/jpetstore/rstest.html'>test more service</a>";
			System.out.println(e);
		}
	    URI location = URI.create("");
	    
	    return Response.created(location).entity(output).build();
	}
	
	@POST
	@Path("/insertOrderXml")
	@Consumes(MediaType.APPLICATION_XML)
    @Produces(MediaType.TEXT_HTML)
	public Response insertOrderXml(Order order) {
		
		System.out.println("REST webservice : insertOrder of " + order.getUsername());
		
		orderService.insertOrder(order);
		int orderId = orderService.insertOrder(order);
		String output = "Order #" + orderId + " successfully created ! <br/> <a href='/jpetstore/rstest.html'>test more service</a>";
	    URI location = URI.create("");
	    
	    return Response.created(location).entity(output).build();
	}
}
