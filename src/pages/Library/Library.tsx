import { useEffect, useState } from "react";
import { scanRoms, Game } from "../../utils/romScanner";

export default function Library() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    async function load() {
      const result = await scanRoms("/home");
      const gamesArray = Object.values(result).flat();
      setGames(gamesArray);
    }

    load();
  }, []);

  return (
    <div style={{ padding: 60, color: "white" }}>
      <h1 style={{ fontSize: 40, marginBottom: 30 }}>
        📚 Biblioteca
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {games.map((g) => (
          <div
            key={g.path}
            style={{
              padding: 16,
              background: "#141b2d",
              borderRadius: 10,
            }}
          >
            <div style={{ fontSize: 18 }}>{g.name}</div>
            <div style={{ opacity: 0.6 }}>{g.console}</div>
          </div>
        ))}
      </div>
    </div>
  );
}