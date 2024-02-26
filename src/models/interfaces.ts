import WebSocket from "ws";

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
  ships?: Ship[];
  isBot?: boolean;
}

export interface Room {
  roomId: number | string;
  roomUsers: RoomUsers[];
  gameState: boolean;
}

export interface RoomUsers {
  name?: string;
  index?: number;
  ws?: WebSocket;
  turnIndex?: number;
  usersFields?: FieldUsers;
  shipsLeft?: number;
}

export interface Ship {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: "small" | "medium" | "large" | "huge";
}

interface FieldUsers {
  firstUserField: Field[][];
  secondUserField: Field[][];
}

export interface FieldOccupied {
  empty: false;
  leftSide: number;
  pastTheCells: number[];
  shipTheCells: Array<[number, number]>;
  overCells: Array<[number, number]>;
  isAttacked?: boolean;
}

export interface FieldEmpty {
  empty: true;
  isAttacked: boolean;
  overCells?: Array<[number, number]>;
  leftSide?: number;
  pastTheCells?: number[];
  shipTheCells?: Array<[number, number]>;
}

export type Field = FieldOccupied | FieldEmpty;

export interface Winner {
  name?: string;
  wins?: number;
}