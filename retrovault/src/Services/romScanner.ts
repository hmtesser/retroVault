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
      return "SNES";
    case "nes":
      return "NES";
    case "gba":
      return "GBA";
    case "n64":
      return "Nintendo 64";
    case "iso":
    case "bin":
      return "PlayStation";
    default:
      return "Unknown";
  }
}

export async function scanRoms(dirPath: string): Promise<Game[]> {
  const entries = await readDir(dirPath);

  return entries
    .filter((e) => e.isFile)
    .map((e) => ({
      name: e.name.replace(/\.[^/.]+$/, ""),
      path: path.join(dirPath, e.name),
      console: detectConsole(e.name),
    }));
}