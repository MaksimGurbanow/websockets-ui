import { wss } from "./src/ws_server";
import { httpServer } from "./src/http_server";

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
wss.emit('connect');
