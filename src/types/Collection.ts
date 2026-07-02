import type { Games } from "./Games";

export interface Collection {
    id: string;
    
    name: string;

    description?: string;
    
    icon?: string;

    games: Games[];

    readonly?: boolean;

}