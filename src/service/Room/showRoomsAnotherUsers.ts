import { sendJsonMessage } from "../../utils/sendJsonMessage";
import { Players } from "../../db/players";
import { rooms } from "../../db/rooms";


export function showRoomsAnotherUsers() {
  Players.forEach((player) => {
    player.ws?.send(sendJsonMessage("update_room", rooms));
  });
}