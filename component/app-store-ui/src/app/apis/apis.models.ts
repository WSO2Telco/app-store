import { Operator, Country, Tier } from '../app.data.models';
import { ApplicationListResult } from '../applications/applications.data.models';
import { EntityState } from '@ngrx/entity';

export enum ApiStatus {
    all = 'All',
    prototyped = 'Prototyped',
    published = 'Published'
}

export class ApiSearchParam {
    constructor(
        public apiStatus: ApiStatus = ApiStatus.all,
        public query: string = '',
        public limit: number,
        public offset: number
    ) {
        if (this.apiStatus != ApiStatus.all)
            this.query = `status:${this.apiStatus} ${this.query}`;
    }
}

export class ApiListDetail {
    context: string;
    description: string;
    id: number;
    name: string;
    provider: string;
    scopes: []
    status: string;
    thumbnailUri: string;
    version: any
}

export interface ApiEntityState extends EntityState<ApiListDetail> {
    ids: [],
    entities: {},
    loading: false,
    loaded: false
    count: 0,
    next: "",
    previous: ""
    availableApp: ApplicationListResult,
    pagination: paginationData,
}

export class subscriptionDetails {
    loading: boolean;
    count: number;
    next: string;
    previous: string;
    list: any
}

export class paginationData {
    total: number;
    offset: number;
    limit: number;
}

export class TagListResult {
    count: number;
    next: string;
    previous: string;
    list: tagData[];
}

export class tagData {
    name: string;
    weight: number;
}

export class sdkParam {
    constructor(
        public lang: string = '',
        public apiId: string = '') { }
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
    tiers: string[];
    subscribed: boolean;
    thumbnailUrl: string;
    thumbnailUri: string;
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
    endpointURLs: any[];
    businessInformation: BusinessInfo;
}

export class BusinessInfo {
    technicalOwner: string = null;
    technicalOwnerEmail: string = null;
    businessOwner: string = null;
    businessOwnerEmail: string = null;
}

export class SubscriptionResult {
    count: number;
    next: string;
    previous: string;
    list: Subscription[];
}

export class Subscription {
    apiIdentifier: string;
    applicationId: string;
    status: string;
    subscriptionId: string;
    tier: string;
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

// export class ApplicationSearchParam {
//     apiId: string
// }

// Subscription Data Models
export class SubscribeParam {
    constructor(
        public country: Country,
        public operators: Operator[],
        public application: Application,
        public tier: Tier
    ) { }
}

export class AddNewSubsParam {
    constructor(
        public tier: string,
        public apiIdentifier: string,
        public applicationId: string,
    ) { }
}

export class SubscribeResult {
    public error: boolean;
    public message: string;
}

// Forum Data Models
export class TopicResult {
    payload: TopicResultPayload;
    success: boolean;
    message: string;
}

export class TopicResultPayload {
    totalTopics: number;
    nextPage: number;
    list: Topic[]
}

export class Topic {
    id: number;
    title: string;
    author: string;
    date: string;
    replies: [];
    replyCount: number;
    content: string;
}