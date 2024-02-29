import { attack} from "./../service/Game/attack";
import { addUserToRoom } from "./../service/Room/addUserToRoom";
import { parseSafelyData } from "./../utils/parseSafelyData";
import { Game, Player, Room } from "src/models/interfaces";
import { createPlayer } from "../service/Player/createPlayer";
import { MessageEvent, WebSocket, WebSocketServer } from "ws";
import { sendJsonMessage } from "../utils/sendJsonMessage";
import { rooms } from "../db/rooms";
import { showWinners } from "../service/Game/showWinners";
import { createRoom } from "../service/Room/createRoom";
import { addShips } from "../service/Game/addShips";
import { findGame } from "../service/Game/findGame";
import { randomAttack } from "../service/Game/randomAttack";

export const wss = new WebSocketServer({ port: 3000 });
const roomsReadyToStart: Set<string> = new Set();

wss.on("connection", (ws: WebSocket, req) => {
  let currentPlayer: Player;
  let currentGame: Game | undefined;
  ws.onmessage = (e: MessageEvent) => {
    try {
      const msg = JSON.parse(e.data.toString());
      const { type, data } = msg;
      const userParseData = parseSafelyData(data);
      switch (type) {
        case "reg":
          currentPlayer = createPlayer(
            userParseData.name,
            userParseData.password,
            ws
          );
          ws.send(sendJsonMessage("reg", currentPlayer));
          ws.send(sendJsonMessage("update_winners", showWinners()));
          ws.send(sendJsonMessage("update_room", rooms));
          break;
        case "create_room":
          createRoom(currentPlayer);
          ws.send(sendJsonMessage("update_room", rooms));
        case "add_user_to_room":
          const { indexRoom } = userParseData;
          addUserToRoom(indexRoom, currentPlayer.name || "");
          break;
        case "add_ships":
          console.log(msg);
          const { ships } = userParseData;
          addShips(currentPlayer.name!, ships);
          break;
        case "attack":
          console.log(msg);
          const { gameId, indexPlayer } = userParseData;
          findGame(gameId, indexPlayer)
            ? attack(currentPlayer, userParseData)
            : "";
        case "randomAttack":
          console.log(msg);
          randomAttack(currentPlayer, userParseData.gameId);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };
});
