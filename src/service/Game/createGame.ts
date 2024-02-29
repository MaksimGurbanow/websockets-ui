import { sendJsonMessage } from "src/utils/sendJsonMessage";
import { Players } from "../../db/players";

export const createGame = (nameUser: string, idRoom: string) => {
  const player = Players.get(nameUser);
  if (player && player.ws) {
    const userData = {
      idGame: idRoom,
      idPlayer: player.index,
    };    
    player.ws.send(sendJsonMessage("create_game", userData));
  }
};