package org.appstore.core.util;

import org.appstore.core.exception.InvalidInputException;
import static org.testng.Assert.fail;
import org.assertj.core.api.Assertions;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

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
public class InputValidatorTest {

    @BeforeMethod
    public void setUp() {
    }

    @AfterMethod
    public void tearDown() {
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Test Input cannot be empty")
    public void testValidateUserInput_shouldThrowException_forNullValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", null);
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Test Input cannot be empty")
    public void testValidateUserInput_shouldThrowException_forEmptyValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", "");
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Test Input cannot be empty")
    public void testValidateUserInput_shouldThrowException_forWhiteSpacesOnlyValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", "  ");
    }

    @Test
    public void testValidateUserInput_shouldPass_forNotEmptyValues() {
        String[] validInputs = {"Test Value", "Abc123"};
        for (String validInput : validInputs) {
            try {
                InputValidator.validateUserInput("Test Input", validInput);
            } catch (Exception e) {
                fail("Test should pass for value : " + validInput);
            }
        }
    }

    @Test
    public void testValidateUserInput_shouldThrowException_forInvalidCharactersInInputValues() {
        String[] invalidStrings = {"<", ">", "\"", "<Abc", "Abc>"};
        for( String invalidString : invalidStrings) {
            Assertions.assertThat(Assertions.catchThrowable(() -> {
                InputValidator.validateUserInput("Test Input", invalidString, InputType.INPUT);
            })).as("InvalidInputException expected for INPUT value : " + invalidString)
                    .isInstanceOf(InvalidInputException.class)
                    .hasMessage("Invalid input for Test Input");
        }
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Test Input cannot be empty")
    public void testValidateUserInput_shouldThrowException_forNullInputValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", null, InputType.INPUT);
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Test Input cannot be empty")
    public void testValidateUserInput_shouldThrowException_forEmptyInputValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", "", InputType.INPUT);
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Test Input cannot be empty")
    public void testValidateUserInput_shouldThrowException_forWhiteSpacesOnlyInputValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", "  ", InputType.INPUT);
    }

    @Test
    public void testValidateUserInput_shouldPass_forValidInputValues() {
        String[] validInputs = {"Test Value", "Abc123"};
        for (String validInput : validInputs) {
            try {
                InputValidator.validateUserInput("Test Input", validInput, InputType.INPUT);
            } catch (Exception e) {
                fail("Test should pass for value : " + validInput);
            }
        }
    }

    @Test
    public void testValidateUserInput_shouldThrowException_forInvalidCharactersInNumberValues() {
        String[] invalidStrings = {"!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "{", "}", "[",
                "]", "|", "\\", ":", ";", "\"", "'", "<", ">", ",", ".", "?", "/", "~", "`", "Abc!", "!Abc", "123@",
                "@123", "Abc#123", "Abc123", "-123", "123.4", "Abc123", "Abc"};
        for( String invalidString : invalidStrings) {
            Assertions.assertThat(Assertions.catchThrowable(() -> {
                InputValidator.validateUserInput("Test Input", invalidString, InputType.NUMBER);
            })).as("InvalidInputException expected for NUMBER value : " + invalidString)
                    .isInstanceOf(InvalidInputException.class)
                    .hasMessage("Invalid input for Test Input");
        }
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Test Input cannot be empty")
    public void testValidateUserInput_shouldThrowException_forNullNumberValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", null, InputType.NUMBER);
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Test Input cannot be empty")
    public void testValidateUserInput_shouldThrowException_forEmptyNumberValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", "", InputType.NUMBER);
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Test Input cannot be empty")
    public void testValidateUserInput_shouldThrowException_forWhiteSpacesOnlyNumberValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", "  ", InputType.NUMBER);
    }

    @Test
    public void testValidateUserInput_shouldPass_forValidNumberValues() {
        String[] validInputs = {"1213", "56774"};
        for (String validInput : validInputs) {
            try {
                InputValidator.validateUserInput("Test Input", validInput, InputType.NUMBER);
            } catch (Exception e) {
                fail("Test should pass for value : " + validInput);
            }
        }
    }

    @Test
    public void testValidateUserInput_shouldThrowException_forInvalidCharactersInSafeTextValues() {
        String[] invalidStrings = {"!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "{", "}", "[",
                "]", "|", "\\", ":", ";", "\"", "'", "<", ">", ",", ".", "?", "/", "~", "`", "Abc!", "!Abc", "123@",
                "@123", "Abc#123", "Abc Cdf", "  Abc"};
        for( String invalidString : invalidStrings) {
            Assertions.assertThat(Assertions.catchThrowable(() -> {
                InputValidator.validateUserInput("Test Input", invalidString, InputType.SAFETEXT);
            })).as("InvalidInputException expected for SAFETEXT value : " + invalidString)
                    .isInstanceOf(InvalidInputException.class)
                    .hasMessage("Invalid input for Test Input");
        }
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Test Input cannot be empty")
    public void testValidateUserInput_shouldThrowException_forNullSafeTextValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", null, InputType.SAFETEXT);
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Test Input cannot be empty")
    public void testValidateUserInput_shouldThrowException_forEmptySafeTextValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", "", InputType.SAFETEXT);
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Test Input cannot be empty")
    public void testValidateUserInput_shouldThrowException_forWhiteSpacesOnlySafeTextValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", "  ", InputType.SAFETEXT);
    }

    @Test
    public void testValidateUserInput_shouldPass_forValidSafeTextValues() {
        String[] validInputs = {"Test123", "123Abc", "Abc", "123"};
        for (String validInput : validInputs) {
            try {
                InputValidator.validateUserInput("Test Input", validInput, InputType.SAFETEXT);
            } catch (Exception e) {
                fail("Test should pass for value : " + validInput);
            }
        }
    }

    @Test
    public void testValidateUserInput_shouldThrowException_forInvalidCharactersInUuidValues() {
        String[] invalidStrings = {"!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "=", "{", "}", "[",
                "]", "|", "\\", ":", ";", "\"", "'", "<", ">", ",", ".", "?", "/", "~", "`", "Abc!", "!Abc", "123@",
                "@123", "Abc#123", "Abc Cdf", "  Abc"};
        for( String invalidString : invalidStrings) {
            Assertions.assertThat(Assertions.catchThrowable(() -> {
                InputValidator.validateUserInput("Test Input", invalidString, InputType.UUID);
            })).as("InvalidInputException expected for UUID value : " + invalidString)
                    .isInstanceOf(InvalidInputException.class)
                    .hasMessage("Invalid input for Test Input");
        }
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Test Input cannot be empty")
    public void testValidateUserInput_shouldThrowException_forNullUuidValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", null, InputType.UUID);
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Test Input cannot be empty")
    public void testValidateUserInput_shouldThrowException_forEmptyUuidValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", "", InputType.UUID);
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Test Input cannot be empty")
    public void testValidateUserInput_shouldThrowException_forWhiteSpacesOnlyUuidValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", "  ", InputType.UUID);
    }

    @Test
    public void testValidateUserInput_shouldPass_forValidUuidValues() {
        String[] validInputs = {"Abc123", "123Abc", "Abc", "123", "Abc-123", "123-456"};
        for (String validInput : validInputs) {
            try {
                InputValidator.validateUserInput("Test Input", validInput, InputType.UUID);
            } catch (Exception e) {
                fail("Test should pass for value : " + validInput);
            }
        }
    }

    @Test
    public void testValidateUserInput_shouldThrowException_forInvalidCharactersInNameValues() {
        String[] invalidStrings = {"!", "#", "$", "%", "^", "*", "+", "=", "{", "}", "|", "\\", ";", "\"", "'", "<",
                ">", ",", "/", "~", "Abc!", "!Abc", "Abc#123"};
        for( String invalidString : invalidStrings) {
            Assertions.assertThat(Assertions.catchThrowable(() -> {
                InputValidator.validateUserInput("Test Input", invalidString, InputType.NAME);
            })).as("InvalidInputException expected for NAME value : " + invalidString)
                    .isInstanceOf(InvalidInputException.class)
                    .hasMessage("Invalid input for Test Input");
        }
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Test Input cannot be empty")
    public void testValidateUserInput_shouldThrowException_forNullNameValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", null, InputType.NAME);
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Test Input cannot be empty")
    public void testValidateUserInput_shouldThrowException_forEmptyNameValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", "", InputType.NAME);
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Test Input cannot be empty")
    public void testValidateUserInput_shouldThrowException_forWhiteSpacesOnlyNameValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", "  ", InputType.NAME);
    }

    @Test
    public void testValidateUserInput_shouldPass_forValidNameValues() {
        String[] validInputs = {"chathurabuddi@gmail.com", "Chathura & Chathuri", "Chathura (Buddika)",
                "Chathura_Buddika", "Chathura [Buddika]", "Chathura : Buddika", "Chathura.", "Chathura?", "`Chathura`",
                "Chathura Buddika", "Chathura"};
        for (String validInput : validInputs) {
            try {
                InputValidator.validateUserInput("Test Input", validInput, InputType.NAME);
            } catch (Exception e) {
                fail("Test should pass for value : " + validInput);
            }
        }
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Invalid input for Test Input")
    public void testValidateUserInput_shouldThrowException_forNotHavingAtLeastSixCharactersInPasswordValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", "Pas@1", InputType.PASSWORD);
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Invalid input for Test Input")
    public void testValidateUserInput_shouldThrowException_forHavingMoreThanThirtyCharactersInPasswordValues() throws InvalidInputException {
        InputValidator.validateUserInput(
                "Test Input",
                "Password123Password123Password@",
                InputType.PASSWORD
        );
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Invalid input for Test Input")
    public void testValidateUserInput_shouldThrowException_forNotHavingCapitalLetterInPasswordValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", "password@123", InputType.PASSWORD);
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Invalid input for Test Input")
    public void testValidateUserInput_shouldThrowException_forNotHavingSimpleLetterInPasswordValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", "PASSWORD@123", InputType.PASSWORD);
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Invalid input for Test Input")
    public void testValidateUserInput_shouldThrowException_forNotHavingNumberInPasswordValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", "Password@", InputType.PASSWORD);
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Invalid input for Test Input")
    public void testValidateUserInput_shouldThrowException_forNotHavingSpecialCharacterInPasswordValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", "Password123", InputType.PASSWORD);
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Test Input cannot be empty")
    public void testValidateUserInput_shouldThrowException_forNullPasswordValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", null, InputType.PASSWORD);
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Test Input cannot be empty")
    public void testValidateUserInput_shouldThrowException_forEmptyPasswordValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", "", InputType.PASSWORD);
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Test Input cannot be empty")
    public void testValidateUserInput_shouldThrowException_forWhiteSpacesOnlyPasswordValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", "  ", InputType.PASSWORD);
    }

    @Test
    public void testValidateUserInput_shouldPass_forValidPasswordValues() {
        String[] validInputs = {"Password@123", "123@Password", "#Password123", "P@$$w0rd"};
        for (String validInput : validInputs) {
            try {
                InputValidator.validateUserInput("Test Input", validInput, InputType.PASSWORD);
            } catch (Exception e) {
                fail("Test should pass for value : " + validInput);
            }
        }
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Invalid input for Test Input")
    public void testValidateUserInput_shouldThrowException_forNotHavingAtCharacterInEmailValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", "name123.com", InputType.EMAIL);
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Invalid input for Test Input")
    public void testValidateUserInput_shouldThrowException_forNotHavingDotCharacterInEmailValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", "name123@com", InputType.EMAIL);
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Invalid input for Test Input")
    public void testValidateUserInput_shouldThrowException_forNotHavingDomainNameInEmailValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", "name123@host.", InputType.EMAIL);
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Invalid input for Test Input")
    public void testValidateUserInput_shouldThrowException_forHavingMoreThanFourLetterDomainNameInEmailValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", "name123@host.domain", InputType.EMAIL);
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Invalid input for Test Input")
    public void testValidateUserInput_shouldThrowException_forHavingLessThanTwoLetterDomainNameInEmailValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", "name123@host.d", InputType.EMAIL);
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Invalid input for Test Input")
    public void testValidateUserInput_shouldThrowException_forNotHavingDotAfterAtCharacterInEmailValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", "name.123@host", InputType.EMAIL);
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Test Input cannot be empty")
    public void testValidateUserInput_shouldThrowException_forNullEmailValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", null, InputType.EMAIL);
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Test Input cannot be empty")
    public void testValidateUserInput_shouldThrowException_forEmptyEmailValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", "", InputType.EMAIL);
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Test Input cannot be empty")
    public void testValidateUserInput_shouldThrowException_forWhiteSpacesOnlyEmailValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", "  ", InputType.EMAIL);
    }

    @Test
    public void testValidateUserInput_shouldPass_forValidEmailValues() {
        String[] validInputs = {"name@host.lk", "firtname.lastname@host.com", "name@host.mobi"};
        for (String validInput : validInputs) {
            try {
                InputValidator.validateUserInput("Test Input", validInput, InputType.EMAIL);
            } catch (Exception e) {
                fail("Test should pass for value : " + validInput);
            }
        }
    }

    @Test
    public void testValidateUserInput_shouldThrowException_forInvalidCharactersInProviderValues() {
        String[] invalidStrings = {"!", "#", "$", "%", "^", "*", "+", "=", "{", "}", "|", "\\", ";", "\"", "'", "<",
                ">", ",", "~", "Abc!", "!Abc", "Abc#123"};
        for( String invalidString : invalidStrings) {
            Assertions.assertThat(Assertions.catchThrowable(() -> {
                InputValidator.validateUserInput("Test Input", invalidString, InputType.PROVIDER);
            })).as("InvalidInputException expected for PROVIDER value : " + invalidString)
                    .isInstanceOf(InvalidInputException.class)
                    .hasMessage("Invalid input for Test Input");
        }
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Test Input cannot be empty")
    public void testValidateUserInput_shouldThrowException_forNullProviderValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", null, InputType.PROVIDER);
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Test Input cannot be empty")
    public void testValidateUserInput_shouldThrowException_forEmptyProviderValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", "", InputType.PROVIDER);
    }

    @Test(expectedExceptions = InvalidInputException.class, expectedExceptionsMessageRegExp = "Test Input cannot be empty")
    public void testValidateUserInput_shouldThrowException_forWhiteSpacesOnlyProviderValues() throws InvalidInputException {
        InputValidator.validateUserInput("Test Input", "  ", InputType.PROVIDER);
    }

    @Test
    public void testValidateUserInput_shouldPass_forValidProviderValues() {
        String[] validInputs = {"abcdef@gmail.com", "Abc & Def", "Abc (Def)", "Abc_Def", "Abc [Def]", "Abc : Def",
                "Abc.", "Abc?", "`Abc`", "Abc Def", "Abc", "Abc/Def"};
        for (String validInput : validInputs) {
            try {
                InputValidator.validateUserInput("Test Input", validInput, InputType.PROVIDER);
            } catch (Exception e) {
                fail("Test should pass for value : " + validInput);
            }
        }
    }

}