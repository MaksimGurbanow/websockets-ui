import { games } from "../../db/games";
import { Users } from "../../db/users";
import { sendJsonMessage } from "../../utils/sendJsonMessage";

export const turnPlayer = (nextPlayerIndex: number, gameId: string) => {
  const game = games.find((game) => game.gameId === gameId);
  if (game) {
    game.players?.forEach((player) => {
      if (player.name) {
        const userPlayer = Users.get(player.name);
        if (userPlayer && userPlayer.ws) {
          if (game.players) {
            let nextIndex = (nextPlayerIndex + 1) % game.players.length;
            game.players.forEach((user) => {
              user.turnIndex = game.players![nextIndex].index;
            });
            const turnData = {
              currentPlayer: game.players[nextIndex].index,
            };
            userPlayer.ws.send(sendJsonMessage("turn", turnData));
          }
        }
      }
    });
  }
};
