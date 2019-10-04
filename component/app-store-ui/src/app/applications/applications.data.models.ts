export enum Tiers {
  DEFAULT = 'DEFAULT',
  UNLIMITED = 'UNLIMITED'
}

export interface ApplicationsState {
  allApplications: ApplicationListResult;
  selectedApplication: ApplicationDetails;
  appSubscriptions: SubscriptionResult;
}

export class GetApplicationsParam {
  constructor(
    public page: number,
    public limit: number,
    public offset: number,
    public query: string
  ) { }
}

export class ApplicationListResult {
  count: number;
  next: string;
  previous: string;
  list: Application[];
}

export class Application {
  applicationId: string;
  attributes: any;
  description: string;
  groupId: any;
  name: string;
  status: string;
  subscriber: string;
  throttlingTier: string;
  tokenType: string;
}

export class CreateApplicationParam {
  name: string;
  description: string;
  throttlingTier: string = "Unlimited";
}

export class TabTile {
  text: string;
  route: string;
  cols: number;
  rows: number;
  class: string;
}

export class SubscriptionResult {
  count: number;
  next: string;
  previous: string;
  list: Subscription[];
}

export class CreateAppResponseData {
  message: string;
  description:string;
}

export class Subscription {
  apiIdentifier: string;
  applicationId: string;
  status: string;
  subscriptionId: string;
  tier: string;
}

export interface AppSubscriptionParam {
  error: string;
  apis: Subscription[];
  depType: string;
}

export class ApplicationDetails {
  groupId: string
  callbackUrl: string;
  subscriber: string;
  throttlingTier: string;
  applicationId: string;
  description: string;
  status: string;
  name: string;
  tokenType:string;
  keys: ApplicationDetailsKeys[];
}

export class ApplicationDetailsKeys {
  consumerKey: string;
  consumerSecret: string;
  keyState: string;
  keyType: string;
  supportedGrantTypes: string[];
  token: any;
  callbackUrl: string;
}

export class GenerateKeyPayload{
  validityTime:number = 3600;
  keyType: string;
  accessAllowDomains:string[] = ["ALL"];
  scopes:string[] = [ "am_application_scope", "default" ];
  supportedGrantTypes:string[];
  callbackUrl:string;
}

// export class GeneratedKey {
//   consumerSecret: string;
//   consumerKey: string;
//   keyState: string;
//   keyType: string;
//   supportedGrantTypes: string[];
//   token: GeneratedKeyToken;
// }

// export class GeneratedKeyToken {
//   validityTime: number;
//   accessToken: string;
//   tokenScopes: string[]
// }