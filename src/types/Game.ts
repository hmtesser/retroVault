export interface Game {
    id: string;

    name: string;
    sortName?: string;

    path: string;
    consoleId: string;

    boxArt?: string;
    screenshot?: string;
    video?: string;
    logo?: string;

    description?: string;
    developer?: string;
    publisher?: string;

    year?: number;

    favorite: boolean;

    playCount?: number;
    playTime?: number;

    lastPlayed?: number;
}