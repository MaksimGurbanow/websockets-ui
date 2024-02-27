import { Ship } from './../../models/interfaces';
import { User } from 'src/models/interfaces';
import { Users } from '../../db/users';
import { WebSocket } from 'ws';

export const createPlayer = (name: string, password: string, ws: WebSocket, ships: Ship[] = [], isBot: boolean = false): User => {
  if (Users.has(name)) {
    const user = Users.get(name)!;
    if (user.password === password) {
      Users.set(name, { ...user, ws: ws });
      return { name, index: user.index, error: false, ships, isBot };
    } else {
      return { error: true, errorText: "Error password", ships, isBot };
    }
  } else {
    const index = Users.size + 1;
    Users.set(name, {
      name,
      password,
      index,
      error: false,
      errorText: "",
      ws,
      isBot,
      ships
    });
    return { name, index, error: false, errorText: "", ws, ships, isBot };
  }
};