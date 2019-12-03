const baseUrl = new URL(window.location.href);
const apiContext = baseUrl.protocol + '//' + baseUrl.host + '/api/am/store/v0.13';

export const ApiEndpoints = {
  apiContext: apiContext,
  authentication: {
    login: baseUrl.protocol + '//' + baseUrl.host + "/app-store/public/api/auth/login",
    logout: baseUrl.protocol + '//' + baseUrl.host + "/app-store/public/api/auth/logout",
    signup: baseUrl.protocol + '//' + baseUrl.host + "/app-store/public/api/user/add",
    changePassword: baseUrl.protocol + '//' + baseUrl.host + "/app-store/public/api/user/change-password-by-user",
    clientRegistration: baseUrl.protocol + '//' + baseUrl.host + '/client-registration/v0.13/register',
    tokenGeneration: baseUrl.protocol + '//' + baseUrl.host + '/oauth2/token',
  },
  apis: {
    search: apiContext + '/apis',
    apiOverview: apiContext + '/apis/',
    applications: apiContext + '/subscriptions',
    subscribe: "./assets/files/subscribe.json",
    tag: apiContext + '/tags',
    sdk: apiContext+'/apis/generate-sdk',
    availableApp: apiContext + '/applications',
  },
  global: {
    countries:
      "https://raw.githubusercontent.com/pbakondy/mcc-mnc-list/master/mcc-mnc-list.json",
    tiers: "./assets/files/tiers.json"
  },
  applications: {
    applications: apiContext + '/applications',
    generateKeys: apiContext + '/applications/generate-keys',
    regenerateSecret: apiContext + '/applications/regenerate-consumersecret'
  },
  subscriptions: apiContext + '/subscriptions',
  forum: {
    getAllTopics: "./assets/files/all-tpics.json",
    getOneTopic: "./assets/files/one-thread.json",
    deleteTopic: "./assets/files/delete-topic.json",
    create: "./assets/files/create-topic.json"
  }
};