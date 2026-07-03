import { readDir } from "@tauri-apps/plugin-fs";
import path from "path-browserify";
import { Game } from "../../types/Game";

export class RomScanner {
  private validExtensions = new Set([
    "sfc",
    "smc",
    "nes",
    "gba",
    "n64",
    "iso",
    "bin",
    "cue",
    "zip",
  ]);

  /**
   * Detecta o sistema pelo arquivo
   */
  private detectConsole(file: string): string {
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

  /**
   * Cria um Game a partir de um arquivo
   */
  private createGame(fileName: string, fullPath: string): Game {
    return {
      id: crypto.randomUUID(),
      name: fileName.replace(/\.[^/.]+$/, ""),
      path: fullPath,
      consoleId: this.detectConsole(fileName),
      favorite: false,
      playTime: 0,
    };
  }

  /**
   * Scan recursivo de diretório
   */
  private async scanFolder(dir: string): Promise<Game[]> {
    const entries = await readDir(dir);
    const games: Game[] = [];

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory) {
        const sub = await this.scanFolder(fullPath);
        games.push(...sub);
        continue;
      }

      if (!entry.isFile) continue;

      const ext = entry.name.split(".").pop()?.toLowerCase();

      if (!ext || !this.validExtensions.has(ext)) continue;

      games.push(this.createGame(entry.name, fullPath));
    }

    return games;
  }

  /**
   * Ponto de entrada principal
   */
  async scan(rootPath: string): Promise<Record<string, Game[]>> {
    const games = await this.scanFolder(rootPath);

    // agrupa por console
    const grouped: Record<string, Game[]> = {};

    for (const game of games) {
    if (!grouped[game.consoleId]) {
        grouped[game.consoleId] = [];
      }
      grouped[game.consoleId].push(game);
    }

    return grouped;
  }
}