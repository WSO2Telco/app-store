/**
 * Copyright (c) 2015, WSO2.Telco Inc. (http://www.wso2telco.com) All Rights Reserved.
 *
 * WSO2.Telco Inc. licences this file to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.appstore.core.util;

// TODO: Auto-generated Javadoc
/**
 * The Enum ReportingTable.
 */
public enum Tables {


	/** The am application. */
	AM_APPLICATION("AM_APPLICATION"),
	AM_SUBSCRIBER("AM_SUBSCRIBER"),
	AM_SUBSCRIPTION("AM_SUBSCRIPTION"),
	DEP_OPERATORS("operators"),
	DEP_OPERATOR_APPS("operatorapps"),
	FORUM_TOPICS("forum_topics"),
	FORUM_REPLIES("forum_replies"),
	RESPONSE_FILTER("response_filter");
	/**
	 * Instantiates a new reporting table.
	 *
	 * @param tObject the t object
	 */
	Tables(String tObject) {
		this.tObject = tObject;
	}
	
	/**
	 * Gets the t object.
	 *
	 * @return the t object
	 */
	public String getTObject(){
		return this.tObject;
	}

	/** The t object. */
	String tObject;
}
