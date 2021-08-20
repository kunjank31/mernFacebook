const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});
let users = [];

const addUser = (userId, socketId) => {
  return (
    !users.some((u) => u.userId === userId) && users.push({ userId, socketId })
  );
};

const removeUser = (socketId) => {
  return users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((u) => u.userId === userId);
};

io.on("connection", (socket) => {
  console.log("a user connected....");

  // Add user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUser", users);
  });

  // Send & Get Message
  socket.on("sendMessages", ({ senderId, receiverId, message }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessages", {
      senderId,
      message,
    });
  });

  // disconnect user
  socket.on("disconnect", () => {
    console.log("a user disconnected...");
    removeUser(socket.id);
    io.emit("getUser", users);
  });
});
