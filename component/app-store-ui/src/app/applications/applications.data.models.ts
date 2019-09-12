export enum Tiers {
  DEFAULT = 'DEFAULT',
  UNLIMITED = 'UNLIMITED'
}

export interface ApplicationsState {
  allApplications: ApplicationListResult;
  selectedApplication: Application;
  appSubscriptions: Subscription[];
}

export class GetApplicationsParam {
  page: number;
}

export class ApplicationListResult {
  count : number = null;
  next: string = null;
  previous: string = null;
  list: Application[];
}

export interface Application {
  applicationId: string;
  attributes: any;
  description: string;
  groupId: any;
  name: string;
  status: string;
  subscriber: string;
  throttlingTier: string;
}

export class CreateApplicationParam {
  name: string;
  description: string;
}

export class TabTile {
  text: string;
  route: string;
  cols: number;
  rows: number;
  class: string;
}

export class Subscription {
  apiName: string;
  apiVersion: string;
  apiProvider: string;
  description: string;
  subscribedTier: string;
  status: string;
  subStatus: string;
  thumburl: string;
  operators: string;
}

export interface AppSubscriptionParam {
  error: string;
  apis: Subscription[];
  depType: string;
}
