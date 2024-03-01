import { Players } from "../../db/players";
import { Winners } from "../../models/interfaces";

export const showWinners = () => {
  let winners: Winners[] = [];
  Players.forEach((player) => {
    if (player.winner !== undefined && player.winner > 0) {
      winners.push({ name: player.name || "Unknown", wins: player.winner });
    }
  });
  return winners;
};