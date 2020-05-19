import { EntityState } from '@ngrx/entity';

export enum Tiers {
  DEFAULT = 'DEFAULT',
  UNLIMITED = 'UNLIMITED'
}

export interface ApplicationState extends EntityState<Application> {
  ids: [],
  entities: {},
  loading: false,
  loaded: false,
  next: "",
  previous: ""
}

export class ApplicationListItem {
  applicationId: string;
  attributes: any;
  description: string;
  groupId: string;
  name: string;
  status: string;
  subscriber: string;
  throttlingTier: string;
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
  constructor(
    public name: string,
    public tokenType: string,
    public description: string,
    public throttlingTier: string = "Unlimited") {
  }
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
  description: string;
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
  groupId: string;
  callbackUrl: string;
  subscriber: string;
  throttlingTier: string;
  applicationId: string;
  description: string;
  status: string;
  name: string;
  tokenType: string;
  keys: ApplicationDetailsKeys[];
}

export class ApplicationDetailsKeys {
  consumerKey: string;
  consumerSecret: string;
  keyState: string;
  keyType: string;
  supportedGrantTypes: string[];
  token: AppKeyToken;
  callbackUrl: string;
}

export class AppKeyToken {
  accessToken: string;
  validityTime: number;
  tokenScopes: string[];
}

export class GenerateKeyPayload {
  validityTime: number = 3600;
  keyType: string;
  accessAllowDomains: string[] = ["ALL"];
  scopes: string[] = ["am_application_scope", "default"];
  supportedGrantTypes: string[];
  callbackUrl: string;
}

export class AddNewSubsParam {
  constructor(
      public tier: string,
      public apiIdentifier: string,
      public applicationId: string,
  ) { }
}