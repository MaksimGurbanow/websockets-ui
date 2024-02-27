import { randomUUID } from "crypto";
import { rooms } from "../../db/rooms";
import { Room, User } from "../../models/interfaces";
export const createRoom = (creator: User) :Room => {
  const roomId = randomUUID();
  const newRoom: Room = {
    roomId: roomId,
    roomUsers: [creator],
    gameState: false,
  };
  rooms.push(newRoom);
  return newRoom;
}