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

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import com.fasterxml.jackson.annotation.JsonProperty;

import net.sourceforge.stripes.validation.Validate;

/**
 * @author Eduardo Macarron
 *
 */
@XmlRootElement(name="account") // JAXB (xml) and JSON 
public class Account implements Serializable {

  private static final long serialVersionUID = 8751282105532159742L;

  @JsonProperty
  private String username;
  @JsonProperty
  private String password;
  @JsonProperty
  private String email;
  @JsonProperty
  private String firstName;
  @JsonProperty
  private String lastName;
  @JsonProperty
  private String status;
  @JsonProperty
  private String address1;
  @JsonProperty
  private String address2;
  @JsonProperty
  private String city;
  @JsonProperty
  private String state;
  @JsonProperty
  private String zip;
  @JsonProperty
  private String country;
  @JsonProperty
  private String phone;
  @JsonProperty
  private String favouriteCategoryId;
  @JsonProperty
  private String languagePreference;
  @JsonProperty
  private boolean listOption;
  @JsonProperty
  private boolean bannerOption;
  @JsonProperty
  private String bannerName;

  public Account() {
  }
  
  public Account(String username, String password, String email, String firstName, String lastName, String status,
		String address1, String address2, String city, String state, String zip, String country, String phone,
		String favouriteCategoryId, String languagePreference, boolean listOption, boolean bannerOption,
		String bannerName) {
		super();
		this.username = username;
		this.password = password;
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.status = status;
		this.address1 = address1;
		this.address2 = address2;
		this.city = city;
		this.state = state;
		this.zip = zip;
		this.country = country;
		this.phone = phone;
		this.favouriteCategoryId = favouriteCategoryId;
		this.languagePreference = languagePreference;
		this.listOption = listOption;
		this.bannerOption = bannerOption;
		this.bannerName = bannerName;
	}

  public String getUsername() {
    return username;
  }

  @XmlElement
  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  @XmlElement
  public void setPassword(String password) {
    this.password = password;
  }

  public String getEmail() {
    return email;
  }

  @XmlElement
  public void setEmail(String email) {
    this.email = email;
  }

  public String getFirstName() {
    return firstName;
  }

  @XmlElement
  @Validate(required=true, on={"newAccount", "editAccount"})
  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  @XmlElement
  @Validate(required=true, on={"newAccount", "editAccount"})
  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getStatus() {
    return status;
  }

  @XmlElement
  public void setStatus(String status) {
    this.status = status;
  }

  public String getAddress1() {
    return address1;
  }

  @XmlElement
  public void setAddress1(String address1) {
    this.address1 = address1;
  }

  public String getAddress2() {
    return address2;
  }

  @XmlElement
  public void setAddress2(String address2) {
    this.address2 = address2;
  }

  public String getCity() {
    return city;
  }

  @XmlElement
  public void setCity(String city) {
    this.city = city;
  }

  public String getState() {
    return state;
  }

  @XmlElement
  public void setState(String state) {
    this.state = state;
  }

  public String getZip() {
    return zip;
  }

  @XmlElement
  public void setZip(String zip) {
    this.zip = zip;
  }

  public String getCountry() {
    return country;
  }

  @XmlElement
  public void setCountry(String country) {
    this.country = country;
  }

  public String getPhone() {
    return phone;
  }

  @XmlElement
  public void setPhone(String phone) {
    this.phone = phone;
  }

  public String getFavouriteCategoryId() {
    return favouriteCategoryId;
  }

  @XmlElement
  public void setFavouriteCategoryId(String favouriteCategoryId) {
    this.favouriteCategoryId = favouriteCategoryId;
  }

  public String getLanguagePreference() {
    return languagePreference;
  }

  @XmlElement
  public void setLanguagePreference(String languagePreference) {
    this.languagePreference = languagePreference;
  }

  public boolean isListOption() {
    return listOption;
  }

  @XmlElement
  public void setListOption(boolean listOption) {
    this.listOption = listOption;
  }

  public boolean isBannerOption() {
    return bannerOption;
  }

  @XmlElement
  public void setBannerOption(boolean bannerOption) {
    this.bannerOption = bannerOption;
  }

  public String getBannerName() {
    return bannerName;
  }

  @XmlElement
  public void setBannerName(String bannerName) {
    this.bannerName = bannerName;
  }

}
