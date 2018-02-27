export enum Tiers {
  DEFAULT = 'DEFAULT',
  UNLIMITED = 'UNLIMITED'
}

export interface ApplicationsState {
  allApplications: Application[];
  selectedApplication: Application;
}

export class GetApplicationsParam {
  page: number;
}

export interface Application {
  name: string;
  tier: string;
  id: number;
  callbackUrl: string;
  status: string;
  description: string;
  apiCount: number;
  groupId: number;
  isBlacklisted: boolean;
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
