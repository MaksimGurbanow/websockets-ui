import { Game } from "src/models/interfaces";

export let games: Game[] = [];

export const removeGame = (roomId: string) => {
  games = games.filter((game) => game.roomId !== roomId);
};

export const addTurnIndex = (indexPlayer: number, roomId: string): number | undefined => {
  const game = games.find((game) => game.roomId === roomId);
  if (!game) {
    console.log(`Game not found: ${roomId}`);
    return -1;
  }

  if (game.roomUsers) {
    const currentPlayerIndex = game.roomUsers.findIndex((user) => user.index === indexPlayer);
    let nextPlayerIndex = currentPlayerIndex + 1;
  
    if (nextPlayerIndex >= game.roomUsers.length) {
      nextPlayerIndex = 0;
    }
  
    game.roomUsers.forEach((user) => {
      user.turnIndex = game.roomUsers![nextPlayerIndex].index;
    });
  
    return game.roomUsers[nextPlayerIndex].index;
  }
};