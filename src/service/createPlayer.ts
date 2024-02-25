import { Users } from '../db/users';
import { WebSocket } from 'ws';

export const createPlayer = (name: string, password: string, ws: WebSocket, bot?: boolean) => {
  if (Users.has(name)) {
    const user = Users.get(name)!;
    if (user.password === password) {
      Users.set(name, { ...user, ws });
      return { name, index: user.index, error: false };
    } else {
      return { error: true, errorText: "Error password" };
    }
  } else {
    const index = Users.size + 1;
    Users.set(name, {
      name,
      password,
      index,
      error: false,
      errorText: "",
      id: 0,
      ws,
      isBot: bot
    });
    return { name, index, error: false, errorText: "" };
  }
};