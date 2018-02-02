export const ApiEndpoints = {
    authentication: {
        login: '../store/site/blocks/user/login/ajax/login.jag',
        logout: '../store/site/blocks/user/login/ajax/login.jag'
    },
    apis: {
        search: '../store/site/blocks/api/api-listing-all/ajax/api-listing-all.jag',
        applications: '../store/site/blocks/application/application-list/ajax/application-list.jag',
        subscribe: 'assets/files/subscribe.json'
    },
    global: {
        countries: 'https://raw.githubusercontent.com/pbakondy/mcc-mnc-list/master/mcc-mnc-list.json',
        tiers: 'assets/files/tiers.json',
    }
};
