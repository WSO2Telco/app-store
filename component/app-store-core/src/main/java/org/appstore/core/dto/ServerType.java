package org.appstore.core.dto;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlAccessorType(XmlAccessType.NONE)
@XmlRootElement(name = "getVersionResponse", namespace = "http://version.services.core.carbon.wso2.org")
public class ServerType implements Serializable{

    private static final long serialVersionUID = 1L;

    @XmlElement(name = "return")
    private String returnval;


    public String getReturnval() {
        return returnval;
    }


    public void setReturnval(String returnval) {
        this.returnval = returnval;
    }
}
