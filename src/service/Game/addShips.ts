import { sendJsonMessage } from './../../utils/sendJsonMessage';
import { Players } from "../../db/players";
import { Ship } from "../../models/interfaces";
import { games } from "../../db/games";
import { turnPlayer } from "./turnPlayer";
import { createFields } from './createFields';

export const addShips = (userName: string, ships: Ship[]) => {
  const player = Players.get(userName);
  if (!player) {
    return;
  }

  player.ships = ships;
  player.ready = true;

  const game = games.find(
    (game) => game.roomUsers && game.roomUsers.some((user) => user.name === userName),
  );

  if (!game) {
    return;
  }

  if (!game.roomUsers) {
    return
  }
  const allPlayersReady = game.roomUsers.every((user) => {
    const userPlayer = Players.get(user.name!);
    return userPlayer ? userPlayer.ready : false;
  });

  if (allPlayersReady) {
    game.userReady = game.roomUsers.length;

    const firstPlayerIndex = game.roomUsers[0].index;
    game.roomUsers.forEach((roomUser, index) => {
      const userPlayer = Players.get(roomUser.name!);
      if (userPlayer && userPlayer.ws) {
        const playerField = createFields(userPlayer.ships!);

        if (!roomUser.usersFields) {
          roomUser.usersFields = {
            firstUserField: index === 0 ? playerField : [],
            secondUserField: index === 1 ? playerField : [],
          };
        } else {
          if (index === 0) {
            roomUser.usersFields.firstUserField = playerField;
          } else if (index === 1) {
            roomUser.usersFields.secondUserField = playerField;
          }
        }
        const startGameData = { ships: userPlayer.ships, currentPlayerIndex: userPlayer.index };
        userPlayer.ws.send(sendJsonMessage("start_game", startGameData));
        turnPlayer(firstPlayerIndex!, game.roomId!);
      }
    });
  }
};