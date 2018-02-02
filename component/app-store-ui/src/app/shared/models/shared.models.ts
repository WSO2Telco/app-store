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
