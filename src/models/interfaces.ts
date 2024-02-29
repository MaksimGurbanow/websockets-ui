import { WebSocket } from "ws";

export interface Player {
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
  ships?: Ship[];
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

export interface Room {
  roomId?: string;
  roomUsers?: RoomUsers[];
  gameState?: boolean;
}

export interface RoomUsers {
  name?: string;
  index?: number;
  turnIndex?: number;
  usersFields?: FieldUsers;
  shipsLeft: number;
}

interface FieldUsers {
  firstUserField: Field[][];
  secondUserField: Field[][];
}

type GameWithoutGameState = Omit<Room, "gameState">;

export interface Game extends GameWithoutGameState {
  userReady?: number;
}

export interface Attack {
  gameId: string;
  x: number;
  y: number;
  indexPlayer: string | number;
}

export type Field = 
  | {
      empty: false;
      leftSide: number;
      pastTheCells: number[];
      shipTheCells: Array<[number, number]>;
      overCells: Array<[number, number]>;
      isAttacked?: boolean;
    }
  | {
      empty: true;
      isAttacked: boolean;
      overCells?: Array<[number, number]>;
      leftSide?: number;
      pastTheCells?: number[];
      shipTheCells?: Array<[number, number]>;
    };

    export interface Winners {
      name: string;
      wins: number;
    }