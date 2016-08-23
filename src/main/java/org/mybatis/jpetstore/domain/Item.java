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
package org.mybatis.jpetstore.domain;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * @author Eduardo Macarron
 *
 */
@XmlRootElement(name="item") // JAXB (xml) and JSON 
public class Item implements Serializable {

  private static final long serialVersionUID = -2159121673445254631L;

  @JsonProperty
  private String itemId;
  @JsonProperty
  private String productId;
  @JsonProperty
  private BigDecimal listPrice;
  @JsonProperty
  private BigDecimal unitCost;
  @JsonProperty
  private int supplierId;
  @JsonProperty
  private String status;
  @JsonProperty
  private String attribute1;
  @JsonProperty
  private String attribute2;
  @JsonProperty
  private String attribute3;
  @JsonProperty
  private String attribute4;
  @JsonProperty
  private String attribute5;
  @JsonProperty
  private Product product;
  @JsonProperty
  private int quantity;

  public String getItemId() {
    return itemId;
  }

  @XmlElement
  public void setItemId(String itemId) {
    this.itemId = itemId.trim();
  }

  public int getQuantity() {
    return quantity;
  }

  @XmlElement
  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }

  public Product getProduct() {
    return product;
  }

  @XmlElement
  public void setProduct(Product product) {
    this.product = product;
  }

  public String getProductId() {
    return productId;
  }

  @XmlElement
  public void setProductId(String productId) {
    this.productId = productId;
  }

  public int getSupplierId() {
    return supplierId;
  }

  @XmlElement
  public void setSupplierId(int supplierId) {
    this.supplierId = supplierId;
  }

  public BigDecimal getListPrice() {
    return listPrice;
  }

  @XmlElement
  public void setListPrice(BigDecimal listPrice) {
    this.listPrice = listPrice;
  }

  public BigDecimal getUnitCost() {
    return unitCost;
  }

  @XmlElement
  public void setUnitCost(BigDecimal unitCost) {
    this.unitCost = unitCost;
  }

  public String getStatus() {
    return status;
  }

  @XmlElement
  public void setStatus(String status) {
    this.status = status;
  }

  public String getAttribute1() {
    return attribute1;
  }

  @XmlElement
  public void setAttribute1(String attribute1) {
    this.attribute1 = attribute1;
  }

  public String getAttribute2() {
    return attribute2;
  }

  @XmlElement
  public void setAttribute2(String attribute2) {
    this.attribute2 = attribute2;
  }

  public String getAttribute3() {
    return attribute3;
  }

  @XmlElement
  public void setAttribute3(String attribute3) {
    this.attribute3 = attribute3;
  }

  public String getAttribute4() {
    return attribute4;
  }

  @XmlElement
  public void setAttribute4(String attribute4) {
    this.attribute4 = attribute4;
  }

  public String getAttribute5() {
    return attribute5;
  }

  @XmlElement
  public void setAttribute5(String attribute5) {
    this.attribute5 = attribute5;
  }

  @Override
  public String toString() {
    return "(" + getItemId() + "-" + getProductId() + ")";
  }

}
