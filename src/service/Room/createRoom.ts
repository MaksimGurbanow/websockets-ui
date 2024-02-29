import { randomUUID } from "crypto";
import { Player, Room } from "../../models/interfaces";
import { rooms } from "../../db/rooms";
import { showRoomsAnotherUsers } from "./showRoomsAnotherUsers";

export function createRoom(currentUser: Player): Room {
  const roomId = randomUUID();
  const newRoom: Room = {
    roomId: roomId,
    roomUsers: [],
    gameState: false,
  };
  newRoom.roomUsers?.push({
    name: currentUser.name,
    index: currentUser.index,
    shipsLeft: 10,
  });

  rooms.forEach((room) => {
    if (room.roomUsers?.some((user) => user.name === currentUser.name)) {
      room.roomUsers = room.roomUsers.filter((user) => user.name !== currentUser.name);
    }
  });

  rooms.push(newRoom);
  showRoomsAnotherUsers();
  return newRoom;
}