import { rooms } from "../../db/rooms";
import { User } from "../../models/interfaces";
export const createRoom = (userData: User) => {
  rooms.push({roomId: `${rooms.length}`, roomUsers: [
    {...userData}
  ]})
}