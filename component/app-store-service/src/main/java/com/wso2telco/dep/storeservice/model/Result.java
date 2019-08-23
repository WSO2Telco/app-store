package com.wso2telco.dep.storeservice.model;

public class Result {

	private boolean error;

	private String message;

    public boolean getError() {
        return error;
    }
 
    public void setError(boolean error) {
        this.error = error;
    }

    public String getMessage() {
        return message;
    }
 
    public void setMessage(String message) {
        this.message = message;
    }
}
