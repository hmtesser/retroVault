import { RomScanner } from "../services/scanner/RomScanner";
import { Game } from "../types/Game";

export class GameService {
  private scanner = new RomScanner();

  private games: Record<string, Game[]> = {};
  private flatGames: Game[] = [];

  private rootPath: string | null = null;

  /**
   * Carrega todas as ROMs do diretório
   */
  async loadLibrary(rootPath: string) {
    this.rootPath = rootPath;

    this.games = await this.scanner.scan(rootPath);

    this.flatGames = Object.values(this.games).flat();

    return this.games;
  }

  /**
   * Retorna todos os jogos (flat)
   */
  getAllGames(): Game[] {
    return this.flatGames;
  }

  /**
   * Retorna jogos agrupados por console
   */
  getGroupedGames(): Record<string, Game[]> {
    return this.games;
  }

  /**
   * Busca jogo por ID
   */
  getGameById(id: string): Game | undefined {
    return this.flatGames.find((g) => g.id === id);
  }

  /**
   * Favoritar / desfavoritar jogo
   */
  toggleFavorite(id: string): void {
    const game = this.getGameById(id);
    if (!game) return;

    game.favorite = !game.favorite;
  }

  /**
   * Atualiza tempo de jogo (em segundos ou minutos — você decide depois)
   */
  updatePlayTime(id: string, time: number): void {
    const game = this.getGameById(id);
    if (!game) return;

    game.playTime = (game.playTime || 0) + time;
    game.lastPlayed = Date.now();
  }

  /**
   * Retorna só favoritos
   */
  getFavorites(): Game[] {
    return this.flatGames.filter((g) => g.favorite);
  }

  /**
   * Refresh da biblioteca
   */
  async refresh() {
    if (!this.rootPath) return;

    await this.loadLibrary(this.rootPath);
  }
}