import { games } from "../../db/games";
import { Players } from "../../db/players";
import { sendJsonMessage } from "../../utils/sendJsonMessage";

export const turnPlayer = (nextPlayerIndex: number, gameId: string) => {
  const game = games.find((game) => game.roomId === gameId);
  if (game) {
    game.roomUsers?.forEach((player) => {
      if (player.name) {
        const userPlayer = Players.get(player.name);
        if (userPlayer && userPlayer.ws) {
          if (game.roomUsers) {
            let nextIndex = (nextPlayerIndex + 1) % game.roomUsers.length;
            game.roomUsers.forEach((user) => {
              user.turnIndex = game.roomUsers![nextIndex].index;
            });
            const turnData = {
              currentPlayer: game.roomUsers[nextIndex].index,
            };
            userPlayer.ws.send(sendJsonMessage("turn", turnData));
          }
        }
      }
    });
  }
};
