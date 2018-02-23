export enum Tiers {
  DEFAULT = "DEFAULT",
  UNLIMITED = "UNLIMITED"
}

export interface ApplicationsState {
  allApplications: Application[];
}

export class GetApplicationsParam{
    page:number;
}

export interface Application {
  name:string;
  tier:string;
  id:number;
  callbackUrl:string;
  status:string;
  description:string;
  apiCount:number;
  groupId:number;
  isBlacklisted:boolean;
}
