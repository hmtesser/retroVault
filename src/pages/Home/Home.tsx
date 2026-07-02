import { useEffect, useState } from "react";

import HomeMenu from "./HomeMenu";
import ExitDialog from "./ExitDialog";

import Library from "../Library/Library";
import Settings from "../Settings/Settings";

export type Screen =
  | "home"
  | "library"
  | "favorites"
  | "settings"
  | "exit";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");

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
    <div className="min-h-screen bg-[#05070b] text-white flex items-center justify-center">

      {screen === "home" && (
        <HomeMenu onNavigate={setScreen} />
      )}

      {screen === "library" && (
        <Library />
      )}

      {screen === "favorites" && (
        <div>
          <h1 className="text-5xl">⭐ Favoritos</h1>
        </div>
      )}

      {screen === "settings" && (
        <Settings />
      )}

      {screen === "exit" && (
        <ExitDialog
          onCancel={() => setScreen("home")}
        />
      )}

    </div>
  );
}