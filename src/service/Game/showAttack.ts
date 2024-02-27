import { games } from "../../db/games";
import { Users } from "../../db/users";
import { sendJsonMessage } from "../../utils/sendJsonMessage";

export const showAttack = (gameId: string, command: string, attackData: object) => {
  const game = games.find((game) => game.gameId === gameId);

  if (game) {
    game.players?.forEach((player) => {
      const playerName = Users.get(player.name!);
      if (playerName && playerName.ws) {
        playerName.ws.send(sendJsonMessage(command, attackData));
      }
    });
  }
}