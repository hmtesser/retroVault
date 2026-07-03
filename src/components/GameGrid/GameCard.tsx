import type { Game } from "../../pages/Home/Home";

interface Props {
  game: Game;
  selected: boolean;
  onClick: () => void;
}

export default function GameCard({
  game,
  selected,
  onClick,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer
        rounded-xl
        bg-[#111827]
        p-3
        transition-all
        duration-150

        ${
          selected
            ? "border-2 border-blue-500 scale-105"
            : "opacity-70 hover:opacity-100"
        }
      `}
    >
      <div className="mb-3 h-40 rounded-lg bg-gray-700" />

      <p className="truncate text-center text-sm">
        {game.name}
      </p>
    </div>
  );
}