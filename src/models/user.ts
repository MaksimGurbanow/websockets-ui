export interface User {
  name?: string;
  index?: number;
  error?: boolean;
  errorText?: string;
  password?: string;
  id?: 0;
  ws?: WebSocket;
  winner?: number;
  ready?: boolean;
  isBot?: boolean;
}
