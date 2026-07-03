import type { Game } from "../../pages/Home/Home";

interface Props {
  game?: Game;
  consoleName: string;
}

export default function GamePreview({
  game,
  consoleName,
}: Props) {
  return (
    <div className="w-80 border-l border-gray-800 bg-[#0b0f17] p-6">

      {game ? (
        <>
          <div className="mb-6 h-64 rounded-xl bg-gray-700" />

          <h2 className="text-2xl font-bold">
            {game.name}
          </h2>

          <p className="mt-2 text-gray-400">
            {consoleName}
          </p>

          <button className="mt-8 w-full rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-500 transition">
            ▶ Jogar
          </button>
        </>
      ) : (
        <p className="text-gray-500">
          Nenhum jogo encontrado.
        </p>
      )}

    </div>
  );
}