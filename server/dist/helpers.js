"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserId = exports.getUserName = exports.getRoomId = void 0;
const getRoomId = (socket) => {
    return socket.handshake.query.roomId;
};
exports.getRoomId = getRoomId;
const getUserName = (socket) => {
    var _a, _b;
    return (_b = (_a = socket.handshake) === null || _a === void 0 ? void 0 : _a.query) === null || _b === void 0 ? void 0 : _b.user;
};
exports.getUserName = getUserName;
const getUserId = (socket) => {
    var _a, _b;
    return (_b = (_a = socket.handshake) === null || _a === void 0 ? void 0 : _a.query) === null || _b === void 0 ? void 0 : _b.userId;
};
exports.getUserId = getUserId;
//# sourceMappingURL=helpers.js.map