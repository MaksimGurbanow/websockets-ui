import { User } from "src/models/interfaces"

export const sendJsonMessage = (type: string, data: User) => {
  return JSON.stringify({
    type,
    data: JSON.stringify(data),
    id: 0,
  })
}