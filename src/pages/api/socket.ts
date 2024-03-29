import { NextApiResponse } from "next";
import { Server } from "socket.io";

export default function handleSocket(req: any, res: any | NextApiResponse) {
  console.log("inside socket");
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("Server is connceted");

      socket.on("join-room", (data) => {
        const { userId, roomid } = data;
        console.log(`new user ${userId} joined room ${roomid}`);
        socket.join(roomid);
        socket.broadcast.to(roomid).emit("user-connected", userId);
      });

      socket.on("user-toggle-audio", (data) => {
        console.log(`new emitted audio`, data);
        const { userId, roomid } = data;
        socket.join(roomid);
        socket.broadcast.to(roomid).emit("user-toggle-audio", userId);
      });
      socket.on("user-toggle-video", (data) => {
        const { userId, roomid } = data;
        console.log(`new emitted video`, data);
        socket.join(roomid);
        socket.broadcast.to(roomid).emit("user-toggle-video", userId);
      });
      socket.on("user-leave", (data) => {
        const { userId, roomid } = data;
        socket.join(roomid);
        socket.broadcast.to(roomid).emit("user-leave", userId);
      });
    });
  } else {
    console.log("socket already running");
  }
  res.end();
}
