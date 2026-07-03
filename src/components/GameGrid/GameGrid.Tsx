import type { Game } from "../../pages/Home/Home";
import GameCard from "./GameCard";

interface Props {
  games: Game[];
  selected: number;
  consoleName: string;
  onSelect: (index: number) => void;
}

export default function GameGrid({
  games,
  selected,
  consoleName,
  onSelect,
}: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-6">

      <h1 className="mb-6 text-3xl font-bold">
        {consoleName}
      </h1>

      <div className="grid grid-cols-5 gap-5">

        {games.map((game, index) => (
          <GameCard
            key={game.path}
            game={game}
            selected={selected === index}
            onClick={() => onSelect(index)}
          />
        ))}

      </div>
    </div>
  );
}