export const ApiEndpoints = {
  authentication: {
    login: "./assets/files/login.json",
    logout: "./assets/files/logout.json",
    signup: "./assets/files/sign-up.json",
    changePassword: "./assets/files/sign-up.json"
  },
  apis: {
    search: "./assets/files/apis.json",
    apiOverview: "./assets/files/api-overview.json",
    applications:
      "../store/site/blocks/application/application-list/ajax/application-list.jag",
    subscribe: "assets/files/subscribe.json"
  },
  global: {
    countries:
      "https://raw.githubusercontent.com/pbakondy/mcc-mnc-list/master/mcc-mnc-list.json",
    tiers: "assets/files/tiers.json"
  },
  applications: {
    getAllApplications: "./assets/files/applications.json",
    getSubscriptions: "./assets/files/subscriptions.json"
  },
  forum: {
    getAllTopics: "../../store/forum/api/topic",
    deleteTopic:"../../store/forum/api/topic/"
  }
};
