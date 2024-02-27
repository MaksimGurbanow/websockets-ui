import { sendJsonMessage } from './../../utils/sendJsonMessage';
import { addTurnIndex, games } from "../../db/games";
import { Attack, Field, User } from "../../models/interfaces";
import { showWinners } from "./showWinners";
import { rooms } from "../../db/rooms";
import { Users } from "../../db/users";
import { removeGame } from "../../db/games";

export const attackFunc = (user: User, dataAttack: Attack) => {
  const { x, y, gameId, indexPlayer } = dataAttack;

  const game = games.find((game) => game.gameId === gameId);
  if (!game) {
    return
  }

  const currentPlayer = game.players?.find((player) => player.index === +indexPlayer);
  if (!currentPlayer) {
    return;
  }

  const opponentPlayer = game.players?.find((player) => player.index !== +indexPlayer);
  if (!opponentPlayer) {
    return;
  }

  const opponentField =
    +indexPlayer === game.players![0].index
      ? opponentPlayer.usersFields?.secondUserField
      : opponentPlayer.usersFields?.firstUserField;

  if (!opponentField) {
    return;
  }
  
  console.log(opponentField)
}