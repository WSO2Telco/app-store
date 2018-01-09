export enum ApiStatus {
    PROTOTYPED = 'PROTOTYPED',
    PRODUCTION = 'PRODUCTION'
}

export class ApiSearchParam {
    constructor(
        public tag: string = null,
        public page: number = 1,
        public query: string = null,
        public apiStatus: ApiStatus = null) { }
}

export interface ApiSearchResult {
    apis: ApiSummery[];
    totalLength: number;
    isMore: boolean;
    isMonetizationEnabled: boolean;
    error: any;
    message: string;
    isRatingActivated: boolean;
}

export interface ApiSummery {
    name: string;
    provider: string;
    version: string;
    context: string;
    status: string;
    thumbnailurl: string;
    visibility: string;
    visibleRoles: string;
    description: string;
    apiOwner: string;
    isAdvertiseOnly: boolean;
    apiBusinessOwner: string;
    rates: number;
    tiers: string[];
    monetizationCategory: string;
}

export interface ApisState {
    apiSearchResult: ApiSearchResult;
}
