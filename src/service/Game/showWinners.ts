import { User, Winner } from "src/models/interfaces"


export const showWinners = (users: any): Winner[] => {
  const winners: Winner[] = [{
    name: "Max",
    wins: 10
  }];
  users.forEach((user: any) => {
    if (user.winner !== undefined && user.winner > 0) {
      winners.push({name: user.name, wins: user.winner})
    }
  })
  return winners;
}