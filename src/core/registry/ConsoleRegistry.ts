import type { ConsoleId } from "../../types/ConsoleId";

export interface ConsoleMeta {
  id: ConsoleId;

  name: string;
  shortName: string;

  extensions: string[];

  icon?: string;
  cover?: string;

  order: number;
}

export const ConsoleRegistry: Record<ConsoleId, ConsoleMeta> = {
  nes: {
    id: "nes",
    name: "Nintendo Entertainment System",
    shortName: "NES",
    extensions: ["nes"],
    order: 1,
  },

  snes: {
    id: "snes",
    name: "Super Nintendo",
    shortName: "SNES",
    extensions: ["sfc", "smc"],
    order: 2,
  },

  n64: {
    id: "n64",
    name: "Nintendo 64",
    shortName: "N64",
    extensions: ["n64", "z64", "v64"],
    order: 3,
  },

  gb: {
    id: "gb",
    name: "Game Boy",
    shortName: "GB",
    extensions: ["gb"],
    order: 4,
  },

  gbc: {
    id: "gbc",
    name: "Game Boy Color",
    shortName: "GBC",
    extensions: ["gbc"],
    order: 5,
  },

  gba: {
    id: "gba",
    name: "Game Boy Advance",
    shortName: "GBA",
    extensions: ["gba"],
    order: 6,
  },

  nds: {
    id: "nds",
    name: "Nintendo DS",
    shortName: "NDS",
    extensions: ["nds"],
    order: 7,
  },

  md: {
    id: "md",
    name: "Mega Drive / Genesis",
    shortName: "MD",
    extensions: ["md", "gen"],
    order: 8,
  },

  sms: {
    id: "sms",
    name: "Master System",
    shortName: "SMS",
    extensions: ["sms"],
    order: 9,
  },

  gg: {
    id: "gg",
    name: "Game Gear",
    shortName: "GG",
    extensions: ["gg"],
    order: 10,
  },

  psx: {
    id: "psx",
    name: "PlayStation",
    shortName: "PSX",
    extensions: ["iso", "cue", "bin", "chd", "pbp"],
    order: 11,
  },

  arcade: {
    id: "arcade",
    name: "Arcade",
    shortName: "ARCADE",
    extensions: ["zip"],
    order: 12,
  },
};