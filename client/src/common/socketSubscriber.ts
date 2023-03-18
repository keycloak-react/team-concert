import { Socket } from "socket.io-client";

function subscribe<T>(to: string, socket: Socket, callback: (data: T) => void) {
  socket.on(to, callback);
}

export default subscribe;
