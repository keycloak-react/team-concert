import { RemoteSocket, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export const getRoomId = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  return socket.handshake.query.roomId as string;
};

export const getUserName = (socket: RemoteSocket<DefaultEventsMap, any>) => {
  return socket.handshake?.query?.user as string;
};

export const getUserId = (
  socket: RemoteSocket<DefaultEventsMap, any> | Socket
) => {
  return socket.handshake?.query?.userId as string;
};
