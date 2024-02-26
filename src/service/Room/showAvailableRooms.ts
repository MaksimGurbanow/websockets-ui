import { Room } from 'src/models/interfaces';
export function showAvailableRooms(rooms: Room[]): Room[]  {
  return rooms.filter((room) => room.gameState === false);
}