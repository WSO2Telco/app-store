/*
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

package org.appstore.core.service;

import com.wso2telco.core.dbutils.exception.BusinessException;
import org.appstore.core.dto.Callback;
import org.appstore.core.dto.ResponseFilter;

@Deprecated
public interface ResponseFilterProcessor {

    Callback addResponseFilter(ResponseFilter responseFilter) throws BusinessException;
    Callback findResponseFilter(String sp, String application, String api, String operation) throws BusinessException;
    Callback findResponseFilter(int id) throws BusinessException;
    Callback deleteResponseFilter(int id) throws BusinessException;

}
