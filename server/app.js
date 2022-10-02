const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const cron = require("node-cron");
const cors = require("cors");
require("dotenv/config");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "UPDATE"],
  },
});

app.use(cors());

app.use(express.json());

const tracksRoute = require("./routes/tracks.Route");
const notificationsRoute = require("./routes/notifications.Route");
const { getLocationFn } = require("./functions/getLocation");
const { sendNotifcation } = require("./functions/sendNotification");

app.use("/", tracksRoute);
app.use("/notifications", notificationsRoute);

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("disconect", (reason) => {
    console.log(reason);
  });
});

cron.schedule("*/5 * * * * *", async () => {
  const data = await getLocationFn();
  io.emit("update", data);
  await sendNotifcation(data);
});

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () =>
  console.log("connected to DB!")
);

server.listen(8080);
