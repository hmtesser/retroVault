import { GameService } from "../services/GameService";

async function runTest() {
  const service = new GameService();

  // MUDE para o caminho real da sua pasta de ROMs
  const result = await service.loadLibrary("/home/seu-user/roms");

  console.log("===== RAW RESULT (grouped) =====");
  console.log(result);

  console.log("===== FLAT GAMES =====");
  console.log(service.getAllGames());

  console.log("===== BY CONSOLE =====");
  console.log(service.getGroupedGames());
}

runTest();