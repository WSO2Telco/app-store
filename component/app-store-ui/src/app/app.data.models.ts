import { AuthState } from "./authentication/authentication.models";
import { ApisState } from "./apis/apis.models";
import { ApplicationsState } from "./applications/applications.data.models";
import { ForumState } from './forum/forum.data.models';

export interface AppState {
  authentication: AuthState;
  apis: ApisState;
  applications: ApplicationsState;
  global: GlobalState;
}

export interface Country {
  countryName: string;
  countryCode: string;
}

export class Operator {
  constructor(
    public brand: string,
    public operator: string,
    public mcc: number,
    public mnc: number
  ) {}
}
export interface CountryOperator {
  type: string;
  countryName: string;
  countryCode: string;
  mcc: number;
  mnc: number;
  brand: string;
  operator: string;
  status: string;
  bands: string;
  notes: string;
}

export interface GlobalState {
  breadcrumb: BreadcrumbItem[];
  layout: {
    rightNavOpened: boolean;
    leftNavOpened: boolean;
    appTheme: string;
    particleAnimation: boolean;
    menuBackImage: boolean;
  };
  mccAndmnc: {
    countries: Country[];
    operators: Operator[];
  };
}

export class Tier {
  constructor(
    public tierName: string,
    public tierDisplayName: string,
    public tierDescription: string
  ) {}
}

export class MenuItem {
  public id: number;
  public name: string;
  public icon?: string;
  public route?: string[] = [];
  public subMenu?: MenuItem[] = null;
  public permissionPattern? = "*";
}

export class BreadcrumbItem
{
  constructor(
    public displayName:string,
    public route:string = null,
    public bcClass:string = ""
  ){}
}

export class UpdateThemeResponseData {
  constructor(
      public error: boolean = false,
      public message: string = '') { }
}

export class ThemeData {
  constructor(public username: string, public theme: string) { }
}