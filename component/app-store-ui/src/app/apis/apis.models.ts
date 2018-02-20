import { Operator, Country, Tier } from '../app.models';

export enum ApiStatus {
    ALL = 'ALL',
    PROTOTYPED = 'PROTOTYPED',
    PRODUCTION = 'PRODUCTION'
}

export class ApiSearchParam {
    constructor(
        public apiStatus: ApiStatus = ApiStatus.ALL,
        public query: string = '',
        public page: number = 1,
        public tag: string = ''
    ) { }
}

export class ApiSearchResult {
    constructor(
        public apis: ApiSummery[] = [],
        public totalLength: number = 0,
        public isMore: boolean = false,
        public isMonetizationEnabled: boolean = false,
        public error: any = null,
        public message: string = null,
        public isRatingActivated: boolean = false) { }
}

export class ApiSummery {
    constructor(
        public name: string = '',
        public provider: string = '',
        public version: string = '',
        public context: string = '',
        public status: string = '',
        public thumbnailurl: string = '',
        public visibility: string = '',
        public visibleRoles: string = '',
        public description: string = '',
        public apiOwner: string = '',
        public isAdvertiseOnly: boolean = false,
        public apiBusinessOwner: string = '',
        public rates: number = 0,
        public tiers: string[] = null,
        public monetizationCategory: string = '') { }
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
    thumbnailurl: string;
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
}

export interface ApisState {
    apiSearchResult: ApiSearchResult;
    selectedApi: ApiSummery;
    selectedApiOverview: ApiOverview;
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
