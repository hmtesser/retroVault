import { readDir } from "@tauri-apps/plugin-fs";
import path from "path-browserify";

export type Game = {
  name: string;
  path: string;
  console: string;
};

function detectConsole(file: string): string {
  const ext = file.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "sfc":
    case "smc":
    case "zip":
      return "SNES";
    case "nes":
      return "NES";
    case "gba":
      return "GBA";
    case "n64":
      return "Nintendo 64";
    case "iso":
    case "bin":
    case "cue":
      return "PlayStation";
    default:
      return "Unknown";
  }
}

const VALID_EXT = new Set([
  "sfc", "smc", "nes", "gba", "n64", "iso", "bin", "cue", "zip"
]);

async function scanFolder(dir: string): Promise<Game[]> {
  const entries = await readDir(dir);
  const games: Game[] = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory) {
      const sub = await scanFolder(entryPath);
      games.push(...sub);
    }

    if (entry.isFile) {
      const ext = entry.name.split(".").pop()?.toLowerCase();

      if (!ext || !VALID_EXT.has(ext)) continue;

      games.push({
        name: entry.name.replace(/\.[^/.]+$/, ""),
        path: entryPath,
        console: detectConsole(entry.name),
      });
    }
  }

  return games;
}

export async function scanRoms(rootPath: string) {
  const games = await scanFolder(rootPath);

  // agrupa por console
  const grouped: Record<string, Game[]> = {};

  for (const game of games) {
    if (!grouped[game.console]) {
      grouped[game.console] = [];
    }
    grouped[game.console].push(game);
  }

  return grouped;
}