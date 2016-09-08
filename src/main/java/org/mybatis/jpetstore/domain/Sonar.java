package org.mybatis.jpetstore.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Sonar {

    private boolean valid;


    public Sonar() {
    }

    public boolean getValid() {
        return this.valid;
    }


    public void setId(boolean bIsValid) {
        this.valid = bIsValid;
    }


    @Override
    public String toString() {
        return "{" +
                "valid=" + valid +
                "}";
    }
}