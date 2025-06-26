import { Server } from "socket-io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});
io.listen(3000);


io.on("connection", (socket) => {
  console.log("user connected");

  socket.emit("hello");
  io.emit("characters", characters);

  socket.on("disconnect", () => {
    console.log("user disconnected");
    characters.slice(
      characters.findIndex((character) => character.id === socket.id)
    );
  });
});