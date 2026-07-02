import { useEffect, useState } from "react";
import type { Screen } from "./Home";

const menu = [
  { label: "Biblioteca", screen: "library" },
  { label: "Favoritos", screen: "favorites" },
  { label: "Configurações", screen: "settings" },
  { label: "Sair", screen: "exit" },
] as const;

interface Props {
  onNavigate: (screen: Screen) => void;
}

export default function HomeMenu({ onNavigate }: Props) {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setSelected((p) => (p + 1) % menu.length);
      }

      if (e.key === "ArrowUp") {
        setSelected((p) => (p - 1 + menu.length) % menu.length);
      }

      if (e.key === "Enter") {
        onNavigate(menu[selected].screen as Screen);
      }
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <div className="flex flex-col items-center">

      <h1 className="mb-14 text-6xl font-bold tracking-wide">
        RetroVault
      </h1>

      <div className="space-y-4">

        {menu.map((item, index) => {

          const active = index === selected;

          return (

            <div
              key={item.label}
              className={`
              w-80
              rounded-xl
              px-6
              py-4
              text-2xl
              transition-all
              duration-200

              ${
                active
                  ? "bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_25px_rgba(59,130,246,.6)] scale-105"
                  : "bg-transparent"
              }
            `}
            >
              {item.label}
            </div>

          );
        })}
      </div>

    </div>
  );
}