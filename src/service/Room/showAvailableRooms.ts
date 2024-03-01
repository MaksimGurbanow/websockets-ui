import { Room } from '../../models/interfaces';
export function showAvailableRooms(rooms: Room[]): Room[]  {
  return rooms.filter((room) => room.gameState === false);
}