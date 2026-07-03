import type { ConsoleId } from "../../types/ConsoleId";

/**
 * Mapeia extensão de arquivo → ConsoleId
 */
const CONSOLE_BY_EXTENSION: Record<string, ConsoleId> = {
  // Nintendo
  nes: "nes",

  smc: "snes",
  sfc: "snes",

  n64: "n64",
  z64: "n64",
  v64: "n64",

  gb: "gb",
  gbc: "gbc",
  gba: "gba",
  nds: "nds",

  // Sega
  md: "md",
  gen: "md",
  sms: "sms",
  gg: "gg",

  // Sony
  iso: "psx",
  cue: "psx",
  bin: "psx",
  chd: "psx",
  pbp: "psx",

  // Arcade / others
  zip: "arcade",
};

/**
 * Detecta console baseado no nome do arquivo
 */
export function detectConsole(fileName: string): ConsoleId | null {
  const ext = fileName.split(".").pop()?.toLowerCase();

  if (!ext) return null;

  return CONSOLE_BY_EXTENSION[ext] ?? null;
}