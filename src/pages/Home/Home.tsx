import { useEffect, useState } from "react";

import HomeMenu from "../../components/HomeMenu/HomeMenu";
import ConsoleSidebar from "../../components/ConsoleSidebar/ConsoleSidebar";
import GameGrid from "../../components/GameGrid/GameGrid";
import GamePreview from "../../components/GamePreview/GamePreview";

import { GameService } from "../../services/GameService";

export type Screen =
  | "home"
  | "library"
  | "favorites"
  | "settings"
  | "exit";

export interface Game {
  name: string;
  path: string;
  [key: string]: any;
}

export interface LibraryMap {
  [consoleName: string]: Game[];
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");

  const [library, setLibrary] = useState<LibraryMap>({});

  const [consoleIndex, setConsoleIndex] = useState(0);
  const [gameIndex, setGameIndex] = useState(0);

  const service = new GameService();

  const consoles = Object.keys(library);
  const currentConsole = consoles[consoleIndex];
  const games = currentConsole ? library[currentConsole] ?? [] : [];

  async function handleScan() {
    const path =
      "/home/diaiain/Desktop/projetos/RetroVault/retrovault/roms";

    const result = await service.loadLibrary(path);

    setLibrary(result);
    setConsoleIndex(0);
    setGameIndex(0);

    setScreen("library");
  }

  useEffect(() => {
    if (screen !== "library") return;

    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          setConsoleIndex((p) => Math.max(p - 1, 0));
          setGameIndex(0);
          break;

        case "ArrowDown":
          setConsoleIndex((p) =>
            Math.min(p + 1, consoles.length - 1)
          );
          setGameIndex(0);
          break;

        case "ArrowLeft":
          setGameIndex((p) => Math.max(p - 1, 0));
          break;

        case "ArrowRight":
          setGameIndex((p) =>
            Math.min(p + 1, games.length - 1)
          );
          break;

        case "Enter":
          if (games[gameIndex]) {
            console.log(games[gameIndex]);
          }
          break;

        case "Escape":
          setScreen("home");
          break;
      }
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [screen, consoles.length, games.length, gameIndex]);

  return (
    <div className="flex h-screen bg-[#05070b] text-white">

      {screen === "home" && (
        <div className="m-auto text-center">

          <HomeMenu onNavigate={setScreen} />

          <button
            onClick={handleScan}
            className="mt-8 rounded-lg bg-blue-600 px-6 py-3 hover:bg-blue-500 transition"
          >
            Scan ROMs
          </button>

        </div>
      )}

      {screen === "library" && (
        <>
          <ConsoleSidebar
            consoles={consoles}
            selected={consoleIndex}
            onSelect={(index) => {
              setConsoleIndex(index);
              setGameIndex(0);
            }}
          />

          <GameGrid
            games={games}
            consoleName={currentConsole ?? ""}
            selected={gameIndex}
            onSelect={setGameIndex}
          />

          <GamePreview
            game={games[gameIndex]}
            consoleName={currentConsole ?? ""}
          />
        </>
      )}

    </div>
  );
}