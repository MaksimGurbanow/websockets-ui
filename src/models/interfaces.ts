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

export interface Room {
  roomId: number | string;
  roomUsers: RoomUsers[];
  gameState?: boolean;
}

export interface RoomUsers {
  name?: string;
  index?: number;
  turnIndex?: number;
  shipsLeft?: number;
}


export interface Winner {
  name?: string;
  wins?: number;
}