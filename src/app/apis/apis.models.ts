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

export interface ApisState {
    apiSearchResult: ApiSearchResult;
    apiStatus: ApiStatus[];
}
