export interface Games{
    id:string;
    name:string;
    path:string;

    systemId:string;

    boxArt?:string;
    screenshot?:string;
    video?:string;

    favorite:boolean;

    playTime: number;

    lastPlayed?: number;
}