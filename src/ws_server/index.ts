import { User } from "src/models/interfaces";
import { createPlayer } from "../service/createPlayer";
import { MessageEvent, WebSocket, WebSocketServer } from "ws";
import { sendJsonMessage } from "../utils/sendJsonMessage";
import { rooms } from "../db/rooms";

export const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", (ws: WebSocket, req) => {
  let user: User;
  console.log(JSON.stringify('Hello'));
  ws.onmessage = (e: MessageEvent) => {
    try {
      const msg = JSON.parse(e.data.toString());
      const { type, data } = msg;
      const userParseData = JSON.parse(data);
      const currentUser = createPlayer
        (userParseData.name, userParseData.password, ws);
      switch (type) {
        case "reg":
          console.log(currentUser)
          ws.send(sendJsonMessage(type, currentUser))
          ws.send(sendJsonMessage("update_room", rooms))
          break;
        case "create_game":
          break;
        case "update_winners":
          break
        case "update_room":
          break;
        case "finish":
          break;
        case "diconnect":
          break;
        case "single_play":
          console.log(type)
          break;
        default:
          break;
        }
    } catch (error) {
      
    }
  }
});
