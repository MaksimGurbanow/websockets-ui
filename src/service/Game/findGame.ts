import { games } from "../../db/games";

export const findGame = (gameId: string, indexPlayer: number) => {
  const game = games.find((game) => game.roomId === gameId);
  if (game) {
    return game.roomUsers?.some((user) => user.turnIndex === indexPlayer);
  }
  return false;
};