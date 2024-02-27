import { games, removeGame } from "src/db/games"
import { Users } from "src/db/users";
import { sendJsonMessage } from "src/utils/sendJsonMessage";
import { showWinners } from "./showWinners";
import { rooms } from "src/db/rooms";

export const announceWinner = (gameId: string, winnerIndex: number) => {
  const game = games.find((game) => game.gameId === gameId);
  if (!game) {
    console.error(`Game not found: ${gameId}`);
    return;
  }

  game.players?.forEach((player) => {
    const playerName = Users.get(player.name!);
    if (player) {
      if (player.index === winnerIndex) {
        player.winner = (player.winner || 0) + 1;
      }

      if (player.ws) {
        player.ws.send(sendJsonMessage("finish", { winPlayer: winnerIndex }));
      }
    }
  });

  Users.forEach((user) => {
    if (user.ws) {
      user.ws.send(sendJsonMessage("update_winners", showWinners(Users)));
    }
  });
  removeGame(gameId);

  games.forEach((game) => {
    if (game.players?.some((user) => user.index === winnerIndex)) {
      console.log(winnerIndex);
      game.players = game.players.filter((user) => user.index !== winnerIndex);
    }
  });
  rooms.forEach((room) => {
    if (room.roomUsers.some((user) => user.index === winnerIndex)) {
      console.log(winnerIndex);
      room.roomUsers = room.roomUsers.filter((user) => user.index !== winnerIndex);
    }
  });
}