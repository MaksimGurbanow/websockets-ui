import { Game } from "../models/interfaces";

export let games: Game[] = [];

export const removeGame = (gameId: string) => {
  games = games.filter((game) => game.gameId !== gameId);
};

export const addTurnIndex = (indexPlayer: number, gameId: string): number | undefined => {
  const game = games.find((game) => game.gameId === gameId);
  if (!game) {
    console.log(`Game not found: ${gameId}`);
    return -1;
  }

  if (game.players) {
    const currentPlayerIndex = game.players.findIndex((user) => user.index === indexPlayer);
    let nextPlayerIndex = currentPlayerIndex + 1;
  
    if (nextPlayerIndex >= game.players.length) {
      nextPlayerIndex = 0;
    }
  
    game.players.forEach((user) => {
      user.turnIndex = game.players![nextPlayerIndex].index;
    });
  
    return game.players[nextPlayerIndex].index;
  }
};