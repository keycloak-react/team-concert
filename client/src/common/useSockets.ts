import { useEffect } from "react";
import { useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_BASE_URL = "https://team-concert-server.onrender.com";

let _socket: Socket;

function createSocket(url: string, room: string, name: string) {
  if (_socket) return _socket;
  _socket = io(url, {
    transports: ["websocket", "polling"],
    path: "/connect/",
    query: {
      roomId: room,
      user: name,
    },
  });

  return _socket;
}

const useSocket = (room: string, name: string) => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const soc = createSocket(SOCKET_BASE_URL, room, name);
    soc.on("connect", () => {
      socket?.disconnect();
      setSocket(soc);
    });
    return () => {
      socket?.disconnect();
    };
  }, []);
  return socket;
};

export default useSocket;
