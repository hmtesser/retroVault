import type { Game } from "./Game";

export interface Collection {
    id: string;
    
    name: string;

    description?: string;
    
    icon?: string;

    games: Game[];

    readonly?: boolean;

}