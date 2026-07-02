export interface Emulator {
    id: string;

    name: string;

    executable: string;

    args: string[];

    supportedSystems: string[];

    coresPath: "/usr/lib/libretro" | "/usr/lib/libretro" | string;
}