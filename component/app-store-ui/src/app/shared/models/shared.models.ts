export enum NotificationTypes {
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
    WARNING = 'WARNING',
    INFO = 'INFO'
}

export interface NotificationData {
    type: NotificationTypes;
    message: string;
}

export interface ScrollPosition {
    sH: number;
    sT: number;
    cH: number;
}

