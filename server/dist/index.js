"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const helpers_1 = require("./helpers");
const express = require("express");
const app = express();
const httpServer = (0, http_1.createServer)(app);
app.get("/", (_req, res) => {
    res.send("Working");
});
const io = new socket_io_1.Server(httpServer, {
    // options
    path: "/connect/",
});
const getAllClients = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const connectedClients = yield io.in(roomId).fetchSockets();
    return connectedClients;
});
const getAllConnectedUsers = (clients) => {
    return clients.map((item) => ({ name: (0, helpers_1.getUserName)(item), id: item.id }));
};
const roomBallVsUser = {};
const updateRoomBall = (room, id) => {
    roomBallVsUser[room] = id || null;
};
const hasBall = (room, userId) => {
    if (!roomBallVsUser[room])
        return true;
    return roomBallVsUser[room] === userId;
};
io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    //fetch the roomid
    const roomId = (0, helpers_1.getRoomId)(socket);
    const userName = (0, helpers_1.getRoomId)(socket);
    socket.join(roomId);
    socket.on("disconnect", () => __awaiter(void 0, void 0, void 0, function* () {
        if (hasBall(roomId, socket.id)) {
            updateRoomBall(roomId, null);
            io.to(roomId).emit("user-with-ball", { userWithBall: null });
        }
        yield socket.leave(roomId);
        const allClients = yield getAllClients(roomId);
        console.log("CLIENTS", allClients.length);
        io.to(roomId).emit("updated-connected-users", {
            connectedUsers: getAllConnectedUsers(allClients),
        });
    }));
    socket.on("user-with-ball", () => {
        io.to(roomId).emit("user-with-ball", {
            userWithBall: roomBallVsUser[roomId] || null,
        });
    });
    socket.on("pass", ({ to }) => __awaiter(void 0, void 0, void 0, function* () {
        if (hasBall(roomId, socket.id)) {
            updateRoomBall(roomId, to);
            io.to(roomId).emit("user-with-ball", { userWithBall: to });
        }
    }));
    const allClients = yield getAllClients(roomId);
    io.to(roomId).emit("updated-connected-users", {
        connectedUsers: getAllConnectedUsers(allClients),
    });
}));
httpServer.listen(8000, () => {
    console.log("Server is listening on port 8000");
});
//# sourceMappingURL=index.js.map