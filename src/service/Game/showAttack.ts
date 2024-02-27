import { games } from "src/db/games";
import { Users } from "src/db/users";
import { Attack } from "src/models/interfaces";
import { sendJsonMessage } from "src/utils/sendJsonMessage";

export const showAttack = (gameId: string, command: string, attackData: Attack) => {
  const game = games.find((game) => game.gameId === gameId);

  if (game) {
    game.players?.forEach((player) => {
      const playerName = Users.get(player.name!);
      if (playerName && playerName.ws) {
        playerName.ws.send(sendJsonMessage("atack", attackData));
      }
    });
  }
}