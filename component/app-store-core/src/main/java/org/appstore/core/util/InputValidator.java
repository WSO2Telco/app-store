package org.appstore.core.util;

import java.util.regex.Pattern;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.appstore.core.exception.InvalidInputException;

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
public class InputValidator {

    private static final Log log = LogFactory.getLog(InputValidator.class);

    public static void validateUserInput(String userInputName, String userInputValue, InputType inputType) throws InvalidInputException {

        InputValidator.validateUserInput(userInputName, userInputValue);

        boolean error = false;
        switch (inputType) {
            case URL:
                break;
            case INPUT:
                if(Pattern.compile("([<>\"'])").matcher(userInputValue).find()) error = true;
                break;
            case NUMBER:
                if(!Pattern.compile("^[0-9]*$").matcher(userInputValue).find()) error = true;
                break;
            case SAFETEXT:
                if(!Pattern.compile("^[a-zA-Z0-9]*$").matcher(userInputValue).find()) error = true;
                break;
            case UUID:
                if(!Pattern.compile("^[a-zA-Z0-9\\-]*$").matcher(userInputValue).find()) error = true;
                break;
            case NAME:
                if(Pattern.compile("([~!#$;%^*+={}|\\\\<>\"'/,])").matcher(userInputValue).find()) error = true;
                break;
            case PASSWORD:
                if(!Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{6,30}$").matcher(userInputValue).find()) error = true;
                break;
            case EMAIL:
                if(!Pattern.compile("^([A-Za-z0-9_\\-.])+@([A-Za-z0-9_\\-.])+\\.([A-Za-z]{2,4})$").matcher(userInputValue).find()) error = true;
                break;
            case PROVIDER:
                if(Pattern.compile("([~!#$;%^*+={}|\\\\<>\"',])").matcher(userInputValue).find()) error = true;
                break;
            default:
        }
        if (error) {
            throw new InvalidInputException("Invalid input for " + userInputName);
        }
    }

    public static void validateUserInput(String inputName, String inputValue) throws InvalidInputException {
        if (inputValue == null || "".equals(inputValue.trim())) {
            String errorMsg = inputName + " cannot be empty";
            log.error(errorMsg);
            throw new InvalidInputException(errorMsg);
        }
    }
}
