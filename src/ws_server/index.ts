import { attackFunc } from './../service/Game/attack';
import { games } from '../db/games';
import { Players } from '../db/players';
import { addUserToRoom } from './../service/Room/addUserToRoom';
import { parseSafelyData } from './../utils/parseSafelyData';
import { Game, Player } from "src/models/interfaces";
import { createPlayer } from "../service/Player/createPlayer";
import { MessageEvent, WebSocket, WebSocketServer } from "ws";
import { sendJsonMessage } from "../utils/sendJsonMessage";
import { rooms } from "../db/rooms";
import { showWinners } from "../service/Game/showWinners";
import { Commands } from "../models/commands";
import { createRoom } from "../service/Room/createRoom";
import { showAvailableRooms } from '../service/Room/showAvailableRooms';
import { addShips } from '../service/Game/addShips';

export const wss = new WebSocketServer({ port: 3000 });
const roomsReadyToStart: Set<string> = new Set();


wss.on("connection", (ws: WebSocket, req) => {
  let currentUser: Player;
  let currentGame: Game | undefined;
  const { reg, add_user_to_room, update_room, update_winners, attack, create_game, create_room, add_ships, start_game, finish, randomAttack, turn } = Commands
  ws.onmessage = (e: MessageEvent) => {
    try {
      const msg = JSON.parse(e.data.toString());
      const { type, data } = msg;
      const userParseData = parseSafelyData(data);
      switch (type) {
        case reg:
          currentUser = createPlayer(userParseData.name, userParseData.password, ws);
          ws.send(sendJsonMessage(reg, currentUser));
          ws.send(sendJsonMessage(update_winners, showWinners()));
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
          currentGame = games.find((game) => 
            game.roomId === userParseData.gameId);
          addShips(game, userParseData);

          if (game && game.players && game.players.every((player) => player.ready)) {
            const currentUserIndex = Math.round(Math.random());
        
            game.players.forEach((player) => {
                if (player.ws) {
                    player.ws.send(sendJsonMessage(start_game, { ships: player.ships, currentUserIndex: player.index }));
                    player.ws.send(sendJsonMessage(turn, { currentPlayer: game?.players![currentUserIndex].index }));
                }
            });
          }
          break
        case attack:
          attackFunc(userParseData.currentPlayer, userParseData);
          break;
        case randomAttack:
          attackFunc(userParseData.indexPlayer, userParseData);
          break;
          case "add_user_to_room":
            const { indexRoom } = userParseData;
            wss.clients.forEach((client) => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(sendJsonMessage(update_room, showAvailableRooms(rooms)));
              }
            });
            addUserToRoom(currentUser, indexRoom);
            break;
        default:
          break;
        }
    } catch (error) {
      console.log(error)
  
    }
  }
});
