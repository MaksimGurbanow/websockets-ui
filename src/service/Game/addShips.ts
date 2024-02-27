import { sendJsonMessage } from "../../utils/sendJsonMessage";
import { games } from "../../db/games"
import { Game, Ship } from "../../models/interfaces"

export const addShips = (game: Game | undefined, data: { ships: Ship[], indexPlayer: number}) => {

  if (game) {
    const player = game.players?.find((player) => player.index === data.indexPlayer);
    if (player) {
      if (!player.ships) {
        player.ships = [];
      }
      player.ships.push(...data.ships);
      player.ready = true;
    }
  }


}