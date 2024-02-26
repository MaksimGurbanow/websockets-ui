import { rooms } from '../../db/rooms';

export const addUserToRoom = (currentUser: {}, roomId: string) => {
  rooms.forEach((room) => {
    if (room.roomId == roomId) {
      room.roomUsers.push(currentUser);
    }
    room.gameState = true;
  })
  
}