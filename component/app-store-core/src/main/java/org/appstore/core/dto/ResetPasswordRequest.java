package org.appstore.core.dto;

//import org.wso2.carbon.captcha.mgt.beans.xsd.CaptchaInfoBean;
/**
 * Copyright (c) 2016, WSO2.Telco Inc. (http://www.wso2telco.com) All Rights Reserved.
 * <p>
 * WSO2.Telco Inc. licences this file to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

public class ResetPasswordRequest {
    String username;
    String code;
    //CaptchaInfoBean captcha;
    String newPassword;
    String theme;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCode() {return code; }

    public void setCode(String code) {this.code = code; }

//    public CaptchaInfoBean getCaptcha() { return captcha; }
//
//    public void setCaptcha(CaptchaInfoBean captcha) { this.captcha = captcha; }

    public String getNewPassword() { return newPassword; }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getTheme() { return theme; }

    public void setTheme(String theme) { this.theme = theme; }
}
