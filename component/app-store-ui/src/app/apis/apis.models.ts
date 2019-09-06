import { Operator, Country, Tier } from '../app.data.models';

export enum ApiStatus {
    all = 'all',
    prototyped = 'prototyped',
    published = 'published'
}

export class ApiSearchParam {
    constructor(
        public apiStatus: ApiStatus = ApiStatus.all,
        public query: string = '',
        public limit: number,
        public offset: number
    ) {
        if(this.apiStatus != ApiStatus.all) 
        this.query = `status:${this.apiStatus} ${this.query}`;
    }
}

export class ApiSearchResult {
    constructor(
        public list: ApiSummary[] = [],
        public count: number = 0,
        public isMore: boolean = false,
        public isMonetizationEnabled: boolean = false,
        public error: any = null,
        public message: string = null,
        public isRatingActivated: boolean = false,
        public pagination: paginationData = new paginationData) { }
}

export class ApiSummary {
    constructor(
        public id: string = '',
        public name: string = '',
        public provider: string = '',
        public version: string = '',
        public context: string = '',
        public status: string = '',
        public thumbnailUrl: string = '',
        public visibility: string = '',
        public visibleRoles: string = '',
        public description: string = '',
        public apiOwner: string = '',
        public isAdvertiseOnly: boolean = false,
        public apiBusinessOwner: string = '',
        public rates: number = 0,
        public tiers: string[] = null,
        public scopes: string[] = null,
        public monetizationCategory: string = '') { }
}

export class paginationData {
    total: number;
    offset: number;
    limit: number;
}

export class ApiOverview {
    name: string;
    provider: string;
    version: string;
    description: string;
    rates: number;
    endpoint: string;
    wsdl: string;
    wadl: string;
    updatedDate: string;
    context: string;
    status: string;
    serverURL: string;
    tiers: Tier[];
    subscribed: boolean;
    thumbnailUrl: string;
    bizOwner: string;
    bizOwnerMail: string;
    techOwner: string;
    techOwnerMail: string;
    visibility: string;
    visibleRoles: string;
    uriTemplates: string;
    apiOwner: string;
    isAdvertiseOnly: string;
    redirectURL: string;
    subscriptionAvailability: string;
    subscriptionAvailableTenants: string;
    isDefaultVersion: string;
    transports: string;
    apiDefinition: any;
    id: string;
    apiBusinessOwner: any;
    scopes: any;
    monetizationCategory: any;
}

export interface ApisState {
    apiSearchResult: ApiSearchResult;
    selectedApi: ApiOverview;
    apiStatus: ApiStatus[];
    userApplications: Application[];
    selectedOperators: Operator[];
    isSubscriptionSuccess: boolean;
}

export interface Application {
    apiCount: number;
    callbackUrl: string;
    description: string;
    groupId: string;
    id: number;
    isBlacklisted: boolean;
    name: string;
    status: string;
    tier: string;
}

export interface ApplicationsResult {
    error: boolean;
    applications: Application[];
    message: string;
}

export class ApplicationSearchParam {
    constructor(
        public action: string
    ) { }
}

export class SubscribeParam {
    constructor(
        public country: Country,
        public operators: Operator[],
        public application: Application,
        public tier: Tier
    ) { }
}


export class SubscribeResult {
    public error: boolean;
    public message: string;
}
