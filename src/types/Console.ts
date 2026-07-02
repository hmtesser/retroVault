import { Games } from "./Games";


export interface ConsoleSystem {

    id: string;

    name: string;

    shortName: string;

    extensions: string[]

    games: Games[];
}
