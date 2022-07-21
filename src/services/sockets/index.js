import { Server } from "socket.io";

let io;

const initSocket = (server) => {
  io = new Server(server);

  io.on("connection", (socket) => {
    socket.emit("chat", "actualizar");
    socket.on("chat", (data) => {
      io.sockets.emit("chat", "actualizar");
    });
  });

  return io;
};

const getSocket = () => {
  return io;
};

export { initSocket, getSocket };
