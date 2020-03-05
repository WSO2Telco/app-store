
# AXP Labs - API Store

AXP Labs - API Store is the RESTful store app of the AXP Server..

## Setup Environment

 - Clone the repo & run `npm install` to install dependencies and all
   required packages.
  - Setup AXP Server ( alternatively you can use  [WSO2 API Manager](https://wso2.com/api-management/previous-releases/) )

## Development server

- Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

- Parallelly start AXP Server as well

## Build & Deploy

 - Run `npm run build` from `app-store-ui` directory to build the
   project. The build artifacts will be stored in the
   `/component/app-store-service/src/main/webapp/public` directory. 
   
  - Run `mvn clean install` from the root directory to create the .war
   package.
   
   - Grab the `app-store.war` from `component/app-store-service/target` and place it in the `/repository/deployment/server/webapps` directory of your AXP Server / WSO2 Server

## Issue Tracking
Done on [JIRA](https://jira.wso2telco.com/jira/browse/INTGW)