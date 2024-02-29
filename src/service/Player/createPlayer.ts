import { Player } from 'src/models/interfaces';
import { Players } from '../../db/players';
import { WebSocket } from 'ws';

export const createPlayer = (name: string, password: string, ws: WebSocket, isBot: boolean = false): Player => {
  if (Players.has(name)) {
    const user = Players.get(name)!;
    if (user.password === password) {
      Players.set(name, { ...user, ws: ws });
      return { name, index: user.index, error: false, isBot };
    } else {
      return { error: true, errorText: "Error password", isBot};
    }
  } else {
    const index = Players.size + 1;
    Players.set(name, {
      name,
      password,
      index,
      error: false,
      errorText: "",
      ws,
      isBot,
  
    });
    return { name, index, error: false, errorText: "", ws, isBot };
  }
};