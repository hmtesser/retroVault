import { useEffect, useState } from "react";
import Library from "./Library";
type Screen = "home" | "library" | "favorites" | "settings";

const menu = [
  { label: "Biblioteca", screen: "library" as Screen },
  { label: "Favoritos", screen: "favorites" as Screen },
  { label: "Configurações", screen: "settings" as Screen },
];

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [selected, setSelected] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [nextScreen, setNextScreen] = useState<Screen | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (animating) return;

      if (screen === "home") {
        if (e.key === "ArrowDown") {
          setSelected((p) => (p + 1) % menu.length);
        }

        if (e.key === "ArrowUp") {
          setSelected((p) => (p - 1 + menu.length) % menu.length);
        }

        if (e.key === "Enter") {
          setNextScreen(menu[selected].screen);
          setAnimating(true);

          setTimeout(() => {
            setScreen(menu[selected].screen);
            setAnimating(false);
          }, 180);
        }
      }

      if (e.key === "Escape") {
        setScreen("home");
        setSelected(0);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [screen, selected, animating]);

  return (
    <div
      style={{
        height: "100vh",
        background: "#0b0f17",
        color: "white",
        fontFamily: "sans-serif",
        padding: 80,
        transition: "all 180ms ease",
        opacity: animating ? 0.3 : 1,
        transform: animating ? "scale(0.98)" : "scale(1)",
      }}
    >
      {/* HOME */}
      {screen === "home" && (
        <>
          <h1 style={{ fontSize: 52, marginBottom: 50 }}>
            RetroVault
          </h1>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {menu.map((item, index) => {
              const active = index === selected;

              return (
                <div
                  key={item.label}
                  style={{
                    width: 320,
                    padding: "14px 20px",
                    fontSize: 26,
                    borderRadius: 10,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 10,
                      background: active
                        ? "linear-gradient(90deg, #1f6feb, #4f9cff)"
                        : "transparent",
                      boxShadow: active
                        ? "0px 0px 25px rgba(31, 111, 235, 0.6)"
                        : "none",
                      opacity: active ? 1 : 0,
                      transition: "opacity 120ms ease",
                    }}
                  />

                  <span style={{ position: "relative", zIndex: 1 }}>
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* LIBRARY */}
      {screen === "library" && (
        <Library />
      )}

      {/* FAVORITES */}
      {screen === "favorites" && (
        <div style={{ animation: "fadeIn 180ms ease" }}>
          <h1 style={{ fontSize: 40 }}>⭐ Favoritos</h1>
        </div>
      )}

      {/* SETTINGS */}
      {screen === "settings" && (
        <div style={{ animation: "fadeIn 180ms ease" }}>
          <h1 style={{ fontSize: 40 }}>⚙ Configurações</h1>
        </div>
      )}

      {/* CSS GLOBAL INLINE */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}