import { User } from 'src/models/interfaces';
import { rooms } from '../../db/rooms';

export const addUserToRoom = (currentUser: User, roomId: string) => {
  rooms.forEach((room) => {
    if (room.roomId == roomId && room.roomUsers[0].name != currentUser.name) {
      room.roomUsers.push(currentUser);
      room.gameState = true;
    }
  })
  
}