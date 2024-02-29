import { sendJsonMessage } from '../../utils/sendJsonMessage';
import { Players } from '../../db/players';
import { games } from "../../db/games";

export const showPlayersAttack = (gameId: string, type: string, data: object) => {
  const game = games.find((g) => g.roomId === gameId);
  if (!game) {
    return;
  }

  game.roomUsers?.forEach((roomUser) => {
    const player = Players.get(roomUser.name || "");
    if (player && player.ws) {
      player.ws.send(sendJsonMessage(type, data));
    }
  });
};