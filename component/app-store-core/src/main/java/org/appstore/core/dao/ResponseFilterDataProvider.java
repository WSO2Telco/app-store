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

package org.appstore.core.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.wso2telco.core.dbutils.DbUtils;
import com.wso2telco.core.dbutils.exception.BusinessException;
import com.wso2telco.core.dbutils.exception.ServiceError;
import com.wso2telco.core.dbutils.util.DataSourceNames;
import org.appstore.core.dto.ResponseFilter;
import org.appstore.core.util.Tables;

public class ResponseFilterDataProvider {

    private static final Logger logger = Logger.getLogger(ResponseFilterDataProvider.class.getName());

    /**
     * Add a response filter record to the database
     *
     * @param responseFilter responseFilter record need to be added
     * @return responseFilter object added to the database with generated id
     * @throws BusinessException if any errors occurred while doing the database operations
     */
    public ResponseFilter addResponseFilter(ResponseFilter responseFilter) throws BusinessException {
        if (isInvalidResponseFilter(responseFilter)) {
            throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
        }

        if (this.findResponseFilter(responseFilter.getSp(), responseFilter.getApplication(),
                responseFilter.getApi(), responseFilter.getOperation()) != null){
            logger.log(Level.SEVERE, "Response filter already exists");
            throw new BusinessException(ServiceError.INVALID_INPUT_VALUE);
        }

        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;

        try {
            connection = DbUtils.getDbConnection(DataSourceNames.WSO2TELCO_DEP_DB);
            if (connection == null) {
                logger.log(Level.SEVERE, "unable to open {} database connection", DataSourceNames.WSO2TELCO_DEP_DB);
                throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
            }

            StringBuilder query = new StringBuilder("INSERT INTO ");
            query.append(Tables.RESPONSE_FILTER.getTObject());
            query.append(" (sp, application, api, operation, fields) values (?, ?, ?, ?, ?)");
            statement = connection.prepareStatement(query.toString(), Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, responseFilter.getSp());
            statement.setString(2, responseFilter.getApplication());
            statement.setString(3, responseFilter.getApi());
            statement.setString(4, responseFilter.getOperation());
            statement.setString(5, responseFilter.getFields());
            logger.log(Level.INFO, "sql query in addResponseFilter : {}", statement);
            statement.executeUpdate();
            resultSet = statement.getGeneratedKeys();

            while (resultSet.next()) {
                responseFilter.setId(resultSet.getInt(1));
            }
        } catch (SQLException e) {
            logger.log(Level.SEVERE, "database operation error in addResponseFilter : ", e);
            throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "error in addResponseFilter : ", e);
            throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
        } finally {
            DbUtils.closeAllConnections(statement, connection, resultSet);
        }
        return responseFilter;
    }

    /**
     * Find response filter for given parameters
     *
     * @param sp String service provider name
     * @param application String application name
     * @param api String api name
     * @param operation String operation name
     * @return ResponseFilter object if there is a matching row, otherwise null
     * @throws BusinessException if any errors occurred while doing the database operations
     */
    public ResponseFilter findResponseFilter(String sp, String application, String api, String operation) throws BusinessException {
        if (isInvalidStrings(sp, application, api, operation)) {
            throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
        }

        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        ResponseFilter responseFilter = null;

        try {
            connection = DbUtils.getDbConnection(DataSourceNames.WSO2TELCO_DEP_DB);
            if (connection == null) {
                logger.log(Level.SEVERE, "unable to open {} database connection", DataSourceNames.WSO2TELCO_DEP_DB);
                throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
            }

            StringBuilder query = new StringBuilder("SELECT id, fields FROM ");
            query.append(Tables.RESPONSE_FILTER.getTObject());
            query.append(" WHERE sp=? AND application=? AND api=? AND operation=?");
            statement = connection.prepareStatement(query.toString());
            statement.setString(1, sp);
            statement.setString(2, application);
            statement.setString(3, api);
            statement.setString(4, operation);
            resultSet = statement.executeQuery();

            if (resultSet.next()) {
                responseFilter = new ResponseFilter();
                responseFilter.setSp(sp);
                responseFilter.setApplication(application);
                responseFilter.setApi(api);
                responseFilter.setOperation(operation);
                responseFilter.setId(resultSet.getInt(1));
                responseFilter.setFields(resultSet.getString(2));
            }
        } catch (SQLException e) {
            logger.log(Level.SEVERE, "database operation error in findResponseFilter : ", e);
            throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "error in findResponseFilter : ", e);
            throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
        } finally {
            DbUtils.closeAllConnections(statement, connection, resultSet);
        }
        return responseFilter;
    }

    /**
     * Find response filter for given id
     *
     * @param id integer id of the response filter
     * @return ResponseFilter object if there is a matching row, otherwise null
     * @throws BusinessException if any errors occurred while doing the database operations
     */
    public ResponseFilter findResponseFilter(int id) throws BusinessException {
        if (id <1) {
            logger.log(Level.SEVERE, "Invalid Parameter");
            throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
        }

        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        ResponseFilter responseFilter = null;

        try {
            connection = DbUtils.getDbConnection(DataSourceNames.WSO2TELCO_DEP_DB);
            if (connection == null) {
                logger.log(Level.SEVERE, "unable to open {} database connection", DataSourceNames.WSO2TELCO_DEP_DB);
                throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
            }

            StringBuilder query = new StringBuilder("SELECT sp, application, api, operation, fields FROM ");
            query.append(Tables.RESPONSE_FILTER.getTObject());
            query.append(" WHERE id=?");
            statement = connection.prepareStatement(query.toString());
            statement.setInt(1, id);
            resultSet = statement.executeQuery();

            if (resultSet.next()) {
                responseFilter = new ResponseFilter();
                responseFilter.setId(id);
                responseFilter.setSp(resultSet.getString(1));
                responseFilter.setApplication(resultSet.getString(2));
                responseFilter.setApi(resultSet.getString(3));
                responseFilter.setOperation(resultSet.getString(4));
                responseFilter.setFields(resultSet.getString(5));
            }
        } catch (SQLException e) {
            logger.log(Level.SEVERE, "database operation error in findResponseFilter : ", e);
            throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "error in findResponseFilter : ", e);
            throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
        } finally {
            DbUtils.closeAllConnections(statement, connection, resultSet);
        }
        return responseFilter;
    }

    /**
     * Remove existing response filter for given id
     *
     * @param id integer id of the response filter to be deleted
     * @throws BusinessException if any errors occurred while doing the database operations
     */
    public void deleteResponseFilter(int id) throws BusinessException {
        if (id <1 || this.findResponseFilter(id) == null) {
            logger.log(Level.SEVERE, "Invalid Parameter");
            throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
        }

        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;

        try {
            connection = DbUtils.getDbConnection(DataSourceNames.WSO2TELCO_DEP_DB);
            if (connection == null) {
                DataSourceNames wso2telcoDepDb = DataSourceNames.WSO2TELCO_DEP_DB;
                logger.log(Level.SEVERE, "unable to open {} database connection", wso2telcoDepDb);
                throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
            }

            StringBuilder query = new StringBuilder("DELETE FROM ");
            query.append(Tables.RESPONSE_FILTER.getTObject());
            query.append(" WHERE id=?");

            statement = connection.prepareStatement(query.toString());
            statement.setInt(1, id);
            statement.executeUpdate();
        } catch (SQLException e) {
            logger.log(Level.SEVERE, "database operation error in deleteResponseFilter : ", e);
            throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "error in deleteResponseFilter : ", e);
            throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
        } finally {
            DbUtils.closeAllConnections(statement, connection, resultSet);
        }
    }

    private boolean isInvalidString(String string) {
        return string == null || "".equals(string.trim());
    }

    private boolean isInvalidStrings(String... strings) {
        for (String string : strings) {
            if (isInvalidString(string)) {
                logger.log(Level.SEVERE, "Invalid Parameter");
                return true;
            }
        }
        return false;
    }

    private boolean isInvalidResponseFilter(ResponseFilter responseFilter) {
        if (isInvalidString(responseFilter.getSp())) {
            logger.log(Level.SEVERE, "Invalid SP");
        } else if (isInvalidString(responseFilter.getApplication())){
            logger.log(Level.SEVERE, "Invalid Application");
        } else if (isInvalidString(responseFilter.getApi())){
            logger.log(Level.SEVERE, "Invalid API");
        } else if (isInvalidString(responseFilter.getOperation())){
            logger.log(Level.SEVERE, "Invalid Operation");
        } else {
            return false;
        }
        return true;
    }
}
