export enum Status {
    Online = 'Online',
    Offline = 'Offline',
    Busy = 'Busy',
    AppearOffline = 'AppearOffline',
    Away = 'Away'
}

export interface User {
    nick: string;
    age?: number;
    active: boolean;
    status: Status;
    uid: any;
    email: string;
    avatar?: string;
    address?: string;
    friends?: any;
}