import { Game } from "./Game";
import { ConsoleId } from "./ConsoleId";

export interface ConsoleSystem {
  id: ConsoleId;
  name: string;
  shortName: string;

  extensions: string[];

  icon?: string;
  cover?: string;

  games: Game[];
}