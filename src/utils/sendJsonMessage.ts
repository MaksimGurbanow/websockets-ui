export const sendJsonMessage = (type: string, data: object) => {
  return JSON.stringify({
    type,
    data: JSON.stringify(data),
    id: 0,
  })
}