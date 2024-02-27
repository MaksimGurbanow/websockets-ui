import { games } from "src/db/games";
import { Users } from "src/db/users";
import { sendJsonMessage } from "src/utils/sendJsonMessage";

export const turnPlayer = (currentPlayerIndex: number, gameId: string) => {
  const game = games.find((game) => game.gameId === gameId);
  if (game) {
    game.players?.forEach((player) => {
      if (player.name) {
        const userPlayer = Users.get(player.name);
        if (userPlayer && userPlayer.ws) {
          const currentPlayerIndex: number = game.players?.findIndex((user) => 
            user.index === currentPlayerIndex)!;
          let nextPlayerIndex = +currentPlayerIndex + 1;

          if (game.players && nextPlayerIndex >= game.players.length) {
            nextPlayerIndex = 0;
          }

          game.players?.forEach((user) => {
            user.turnIndex = game.players![nextPlayerIndex].index;
          });
          const turnData = {
            currentPlayer: game.players![nextPlayerIndex].index,
          };
          userPlayer.ws.send(sendJsonMessage("turn", turnData));
        }
      }
    })
  }
}