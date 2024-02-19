import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', (ws) => {
  console.log('Hello');

  ws.on('close', () => {
    console.log('Bye');
  });
});
