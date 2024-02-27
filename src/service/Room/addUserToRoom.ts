import { Room, User } from 'src/models/interfaces';
import { rooms } from '../../db/rooms';
import { sendJsonMessage } from '../../utils/sendJsonMessage';
import { games } from '../../db/games';

export const addUserToRoom = (currentUser: User, roomId: string) => {
  const room = rooms.find((room) => room.roomId === roomId);
  
  if (room && room.roomUsers[0].name !== currentUser.name) {
    room.roomUsers.push(currentUser);
    room.gameState = true;

    games.push({gameId: roomId, players: room.roomUsers})
    room?.roomUsers.forEach((user) => {
      user.ws?.send(sendJsonMessage("create_game", {idGame: room.roomId, idPlayer: user.index}))
    })
  }

  
}