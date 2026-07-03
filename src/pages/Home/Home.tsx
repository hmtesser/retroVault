import { useEffect, useState } from "react";
import HomeMenu from "./HomeMenu";
import ExitDialog from "./ExitDialog";

import Library from "../Library/Library";
import Settings from "../Settings/Settings";

import { GameService } from "../../services/GameService";

const service = new GameService();

export type Screen =
  | "home"
  | "library"
  | "favorites"
  | "settings"
  | "exit";


export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");

  const [library, setLibrary] = useState<any>({});
  const [selectedConsole, setSelectedConsole] = useState("");
  const [selectedGame, setSelectedGame] = useState(0);

  const service = new GameService();

  async function handleScan() {
    const path =
      "/home/diaiain/Desktop/projetos/RetroVault/retrovault/roms";

    const result = await service.loadLibrary(path);

    setLibrary(result);

    const firstConsole = Object.keys(result)[0];
    setSelectedConsole(firstConsole);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && screen !== "home") {
        setScreen("home");
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [screen]);

  return (
    <div className="flex h-screen bg-[#05070b] text-white">

      {/* MENU HOME */}
      {screen === "home" && (
        <div className="m-auto text-center">
          <HomeMenu onNavigate={setScreen} />

          <button
            onClick={handleScan}
            className="mt-6 px-6 py-3 bg-blue-600 rounded"
          >
            Scan ROMs
          </button>
        </div>
      )}

      {/* EMUELEC MODE */}
      {screen !== "home" && (
        <>
          {/* LEFT CONSOLES */}
          <div className="w-48 bg-[#0b0f17] border-r border-gray-800 p-4">
            {Object.keys(library).map((console) => (
              <div
                key={console}
                onClick={() => {
                  setSelectedConsole(console);
                  setSelectedGame(0);
                }}
                className={`p-2 cursor-pointer rounded mb-2 ${
                  selectedConsole === console
                    ? "bg-blue-600"
                    : "text-gray-400"
                }`}
              >
                {console}
              </div>
            ))}
          </div>

          {/* RIGHT GAMES */}
          <div className="flex-1 p-6 grid grid-cols-4 gap-4 overflow-auto">
            {(library[selectedConsole] || []).map((game: any, index: number) => (
              <div
                key={game.path}
                onClick={() => setSelectedGame(index)}
                className={`bg-[#111827] p-3 rounded cursor-pointer transition ${
                  selectedGame === index
                    ? "border border-blue-500 scale-105"
                    : "border border-transparent"
                }`}
              >
                <div className="h-32 bg-gray-800 rounded mb-2" />
                <p className="text-sm">{game.name}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}