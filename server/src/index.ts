import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { createServer } from "http";
import { RemoteSocket, Server } from "socket.io";
import { getRoomId, getUserName } from "./helpers";
const express = require("express");
const app = express();

const httpServer = createServer(app);

app.get("/", (_req: any, res: any) => {
  res.send("Working");
});

const io = new Server(httpServer, {
  // options
  path: "/connect/",
});

const getAllClients = async (roomId: string) => {
  const connectedClients = await io.in(roomId).fetchSockets();
  return connectedClients;
};

const getAllConnectedUsers = (
  clients: RemoteSocket<DefaultEventsMap, any>[]
) => {
  return clients.map((item) => ({ name: getUserName(item), id: item.id }));
};

const roomBallVsUser: { [key: string]: string | null } = {};
const updateRoomBall = (room: string, id: string | null) => {
  roomBallVsUser[room] = id || null;
};

const hasBall = (room: string, userId: string) => {
  if (!roomBallVsUser[room]) return true;
  return roomBallVsUser[room] === userId;
};

io.on("connection", async (socket) => {
  //fetch the roomid
  const roomId = getRoomId(socket);
  const userName = getRoomId(socket);
  socket.join(roomId);
  socket.on("disconnect", async () => {
    if (hasBall(roomId, socket.id)) {
      updateRoomBall(roomId, null);
      io.to(roomId).emit("user-with-ball", { userWithBall: null });
    }
    await socket.leave(roomId);
    const allClients = await getAllClients(roomId);
    io.to(roomId).emit("updated-connected-users", {
      connectedUsers: getAllConnectedUsers(allClients),
    });
  });

  socket.on("user-with-ball", () => {
    io.to(roomId).emit("user-with-ball", {
      userWithBall: roomBallVsUser[roomId] || null,
    });
  });

  socket.on("get-connected-users", async () => {
    const allClients = await getAllClients(roomId);
    io.to(roomId).emit("updated-connected-users", {
      connectedUsers: getAllConnectedUsers(allClients),
    });
  });

  socket.on("pass", async ({ to }: { to: string }) => {
    if (hasBall(roomId, socket.id)) {
      updateRoomBall(roomId, to);
      io.to(roomId).emit("user-with-ball", { userWithBall: to });
    }
  });
  const allClients = await getAllClients(roomId);
  io.to(roomId).emit("updated-connected-users", {
    connectedUsers: getAllConnectedUsers(allClients),
  });
});

httpServer.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
