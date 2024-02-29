import { rooms, removeRoom } from "src/db/rooms";
import { createGame } from "../../service/Game/createGame"
import { Players } from "../../db/players";
import { showRoomsAnotherUsers } from "./showRoomsAnotherUsers";

export const addUserToRoom = (roomId: string, playerName: string) => {
  const currentPlayer = Players.get(playerName);
  const roomToAdd = rooms.find((room) => room.roomId === roomId);

  if (!currentPlayer || !roomToAdd || !roomToAdd.roomUsers) {
    return;
  }


  if (roomToAdd.roomUsers.some((user) => user.name === currentPlayer.name)) {
    return;
  }

  rooms.forEach((room) => {
    if (room.roomUsers?.some((user) => user.name === currentPlayer.name)) {
      room.roomUsers = room.roomUsers.filter((user) => user.name !== currentPlayer.name);
    }
  });

  const userData = {
    name: currentPlayer.name,
    index: currentPlayer.index,
    shipsLeft: 10
  };
  roomToAdd.roomUsers.push(userData);

  if (roomToAdd.roomUsers.length === 2) {
    roomToAdd.gameState = true;
    roomToAdd.roomUsers.forEach((user) => {
      createGame(user.name || "", roomToAdd.roomId || "");
    });
    removeRoom(roomId);
  }

  showRoomsAnotherUsers();
};