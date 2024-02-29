import { Room } from "../models/interfaces";
import { games } from "./games";

export let rooms: Room[] = [];

export const removeRoom = (roomId: string) => {
  rooms = rooms.filter((room) => {
    if (room.roomId === roomId) {
      games.push(room);
      room.roomId !== roomId;
    }
  });
};