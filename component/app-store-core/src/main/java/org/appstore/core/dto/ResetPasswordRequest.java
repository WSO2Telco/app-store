package org.appstore.core.dto;

import org.wso2.carbon.captcha.mgt.beans.xsd.CaptchaInfoBean;

public class ResetPasswordRequest {
    String username;
    String code;
    CaptchaInfoBean captcha;
    String newPassword;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCode() {return code; }

    public void setCode(String code) {this.code = code; }

    public CaptchaInfoBean getCaptcha() { return captcha; }

    public void setCaptcha(CaptchaInfoBean captcha) { this.captcha = captcha; }

    public String getNewPassword() { return newPassword; }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
