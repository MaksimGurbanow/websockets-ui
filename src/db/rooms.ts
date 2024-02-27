import { Room } from "../models/interfaces";
import { games } from "../db/games";

export let rooms: Room[] = [];

export const removeRoom = (roomId: string) => {
  rooms = rooms.filter((room) => {
    if (room.roomId === roomId) {
      games.push({
        players: room.roomUsers,
        gameId: roomId,
      });
      room.roomId !== roomId;
    }
  });
};