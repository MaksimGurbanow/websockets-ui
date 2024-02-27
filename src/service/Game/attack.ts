import { sendJsonMessage } from './../../utils/sendJsonMessage';
import { games } from "../../db/games";
import { Attack, Field, User } from "../../models/interfaces";
import { announceWinner } from './announceWinner';
import { turnPlayer } from './turnPlayer';
import { Users } from 'src/db/users';


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
  
  const cell = opponentField[y][x];

  cell.isAttacked = true;
  const isHit = !cell.empty;

  if(isHit) {
    cell.leftSide--;
    if (cell.leftSide === 0) {
      if (opponentPlayer.shipsLeft) {
        opponentPlayer.shipsLeft -= 1;
        processDestroyedShip(cell, gameId, currentPlayer.index!);
      }
      if (opponentPlayer.shipsLeft === 0) {
        if (currentPlayer.index) {
          announceWinner(gameId, currentPlayer.index);
          return;
        }
      }

      const nextPlayerIndex = game.players?.find((player) => player.index !== +indexPlayer)?.index;
      if (nextPlayerIndex) {
        turnPlayer(nextPlayerIndex, gameId);
      }
    } else {
      game.players?.forEach((player) => {
        const playerName = Users.get(player.name!);
        if (player && player.ws) {
          player.ws.send(sendJsonMessage("atack", {
            position: {y, x},
            currentPlayer: currentPlayer.index,
            status: "shot"
          }));
        }
      })

      const nextPlayerIndex = game.players?.find((player) => player.index !== +indexPlayer)?.index;
      if (nextPlayerIndex !== undefined) {
        turnPlayer(nextPlayerIndex, gameId);
      }
    } 
  } else {
    game.players?.forEach((player) => {
      const playerName = Users.get(player.name!);
      if (player && player.ws) {
        player.ws.send(sendJsonMessage("atack", {
          position: {y, x},
          currentPlayer: currentPlayer.index,
          status: "missed"
        }));
      }
    });
    const nextPlayerIndex = game.players?.find((player) => player.index === +indexPlayer)?.index;
    if (nextPlayerIndex !== undefined) {
      turnPlayer(nextPlayerIndex, gameId);
    }
  }
}

const processDestroyedShip = (cell: Field, gameId: string, currentPlayerIndex: number) => {
  cell.overCells?.forEach((aroundCell) => {
    const [x, y] = aroundCell;
    game.players?.forEach((player) => {
      const playerName = Users.get(player.name!);
      if (player && player.ws) {
        player.ws.send(sendJsonMessage("atack", {
          position: {y, x},
          currentPlayer: currentPlayer.index,
          status: "missed"
        }));
      }
    });
  });

  cell.shipTheCells?.forEach((shipCell) => {
    showPlayersAttack(gameId, "attack", {
      position: { x: shipCell[0], y: shipCell[1] },
      currentPlayer: currentPlayerIndex,
      status: "killed",
    });
  });
};