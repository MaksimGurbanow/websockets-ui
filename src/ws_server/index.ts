import { addUserToRoom } from './../service/Room/addUserToRoom';
import { parseSafelyData } from './../utils/parseSafelyData';
import { User } from "src/models/interfaces";
import { createPlayer } from "../service/Player/createPlayer";
import { MessageEvent, WebSocket, WebSocketServer } from "ws";
import { sendJsonMessage } from "../utils/sendJsonMessage";
import { rooms } from "../db/rooms";
import { showWinners } from "../service/Game/showWinners";
import { Users } from "../db/users";
import { Commands } from "../models/commands";
import { createRoom } from "../service/Room/createRoom";

export const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", (ws: WebSocket, req) => {
  let currentUser: User;
  const { reg, add_user_to_room, update_room, update_winners, attack, create_game, create_room, add_ships, start_game, finish, randomAttack, turn } = Commands
  ws.onmessage = (e: MessageEvent) => {
    try {
      const msg = JSON.parse(e.data.toString());
      const { type, data } = msg;
      const userParseData = parseSafelyData(data);
      switch (type) {
        case reg:
          currentUser = createPlayer(userParseData.name, userParseData.password, ws, false);
          ws.send(sendJsonMessage(reg, currentUser));
          ws.send(sendJsonMessage(update_winners, showWinners(Users)));
          ws.send(sendJsonMessage(update_room, rooms));
          break;
          case create_room:
            createRoom({...currentUser});
            ws.send(sendJsonMessage(update_room, rooms));
            break;
        case add_ships:
          break
        case attack:
          break;
        case randomAttack:
          break;
        case add_user_to_room:
          const { indexRoom } = userParseData;
          addUserToRoom(currentUser, indexRoom);
          break;
        default:
          break;
        }
    } catch (error) {
      console.log('Error');

    }
  }
});
