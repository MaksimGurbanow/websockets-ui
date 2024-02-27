import { Game, Ship } from "../../models/interfaces"
import { createFields } from "./createFields";
import { Users } from "../../db/users";

export const addShips = (game: Game | undefined, data: { ships: Ship[], indexPlayer: number}) => {

  if (game) {
    const player = game.players?.find((player) => player.index === data.indexPlayer);
    if (player) {
      if (!player.ships) {
        player.ships = [];
      }
      player.ships.push(...data.ships);
      player.shipsLeft = player.ships.length;
      player.ready = true;
      game.players?.forEach((player, index) => {
        const userPlayer = Users.get(player.name!);
        if (userPlayer && userPlayer.ws) {
          const playerField = createFields(userPlayer.ships!);

          if (!player.usersFields) {
            player.usersFields = {
              firstUserField: index === 0 ? playerField : [],
              secondUserField: index === 1 ? playerField : [],
            };
          } else {
            if (index === 0) {
              player.usersFields.firstUserField = playerField;
            } else if (index === 1) {
              player.usersFields.secondUserField = playerField;
            }
          }
        }
      })
    }
  }


}