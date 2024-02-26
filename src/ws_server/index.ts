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
import { showAvailableRooms } from '../service/Room/showAvailableRooms';

export const wss = new WebSocketServer({ port: 3000 });
const roomsReadyToStart: Set<string> = new Set();


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
          ws.send(sendJsonMessage(update_room, showAvailableRooms(rooms)));
          break;
          case create_room:
            createRoom({...currentUser});
            wss.clients.forEach((client) => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(sendJsonMessage(update_room, showAvailableRooms(rooms)));
              }
            })
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
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(sendJsonMessage(update_room, showAvailableRooms(rooms)));
            }
          })
          const room = rooms[indexRoom];
          if (room && room.roomUsers.length === 2 && !roomsReadyToStart.has(indexRoom)) {
            roomsReadyToStart.add(indexRoom);
            room.roomUsers.forEach((user) => {
              user.ws?.send(sendJsonMessage(create_game, {idGame: indexRoom, idPLayer: user.index}));
            });
          }
          break;
        default:
          break;
        }
    } catch (error) {

    }
  }
});
