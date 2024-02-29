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
  ws.onmessage = (e: MessageEvent) => {
    try {
      const msg = JSON.parse(e.data.toString());
      const { type, data } = msg;
      const userParseData = parseSafelyData(data);
      switch (type) {
        case "reg":
          
          break;
      
        default:
          break;
      }
    } catch (error) {
      console.log(error)
  
    }
  }
});
