import { games } from "../../db/games";
import { Attack, Field, User } from "../../models/interfaces";
import { announceWinner } from "./announceWinner";
import { turnPlayer } from "./turnPlayer";
import { showAttack } from "./showAttack";

export const attackFunc = (user: User, dataAttack: Attack) => {
  const { x, y, gameId, indexPlayer } = dataAttack;

  const game = games.find((game) => game.gameId === gameId);
  if (!game) return;

  const currentPlayer = game.players?.find(
    (player) => player.index === +indexPlayer
  );
  const opponentPlayer = game.players?.find(
    (player) => player.index !== +indexPlayer
  );
  if (!currentPlayer || !opponentPlayer) return;

  const opponentField =
    +indexPlayer === game.players![0].index
      ? opponentPlayer.usersFields?.secondUserField
      : opponentPlayer.usersFields?.firstUserField;
  if (!opponentField) return;

  const cell = opponentField[y]?.[x];
  if (!cell || (cell.isAttacked && !cell.leftSide)) return;
  cell.isAttacked = true;
  const isHit = !cell.empty;

  console.log(opponentField)
  if (isHit) {
    cell.leftSide--;
    console.log(cell.leftSide)
    if (cell.leftSide === 0) {
      --opponentPlayer.shipsLeft!;
      processDestroyedShip(cell, gameId, currentPlayer.index!);
      cell.overCells.forEach((overCell) => {
        const [x, y] = overCell;
        const cell = opponentField[y]?.[x];
        cell.isAttacked = true;
      })
      if (opponentPlayer.shipsLeft === 0) {
        announceWinner(gameId, currentPlayer.index!);
        return;
      }
    }
    showAttack(gameId, "attack", {
      position: { y, x },
      currentPlayer: currentPlayer.index,
      status: "shot",
    });
  } else {
    showAttack(gameId, "attack", {
      position: { y, x },
      currentPlayer: currentPlayer.index,
      status: "missed",
    });

    const nextPlayerIndex = game.players?.find(
      (player) => player.index !== +indexPlayer
    )?.index;
    if (nextPlayerIndex !== undefined) {
      turnPlayer(nextPlayerIndex, gameId);
    }
  }
};

const processDestroyedShip = (
  cell: Field,
  gameId: string,
  currentPlayerIndex: number
) => {

  cell.overCells?.forEach(([x, y]) => {
    showAttack(gameId, "attack", {
      position: { x, y },
      currentPlayer: currentPlayerIndex,
      status: "missed",
    });
  });

  cell.shipTheCells?.forEach(([x, y]) => {
    showAttack(gameId, "attack", {
      position: { x, y },
      currentPlayer: currentPlayerIndex,
      status: "killed",
    });
  });
};
