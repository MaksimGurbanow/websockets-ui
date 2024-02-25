import { User } from "src/models/user";
import { createPlayer } from "../service/createPlayer";
import { Users } from "src/db/users";
import { MessageEvent, WebSocket, WebSocketServer } from "ws";
import { sendJsonMessage } from "src/utils/sendJsonMessage";

export const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", (ws: WebSocket, req) => {
  let user: User;
  console.log(JSON.stringify('Hello'));
  ws.onmessage = (e: MessageEvent) => {
    try {
      const msg = JSON.parse(e.data.toString());
      const { type, data } = msg;
      const userParseData = JSON.parse(data);
      console.log(msg);
      const currentUser = createPlayer
        (userParseData.name, userParseData.password, ws);
      console.log(currentUser)
      ws.send(sendJsonMessage(type, currentUser))
    } catch (error) {
      
    }
  }
});
