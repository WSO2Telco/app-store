package org.appstore.core.dto;


public class Callback {
	
	

    private Object payload;
    private Boolean success;
    private String message;

    public Object getPayload() {
        return payload;
    }

    public Callback setPayload(Object payload) {
        this.payload = payload;
        return this;
    }

    public Boolean getSuccess() {
        return success;
    }

    public Callback setSuccess(Boolean success) {
        this.success = success;
        return this;

    }

    public String getMessage() {
        return message;
    }

    public Callback setMessage(String message) {
        this.message = message;
        return this;
    }

}
