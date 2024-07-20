require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const routes = require("./routes");
const { Server } = require("socket.io");

const app = express();
app.use(
  cors({
    origin: "https://celttrade-mall.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log(`Failed to connect to MongoDB: ${err.message}`);
});

// Ensure the server listens with http.Server
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://celttrade-mall.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
});

app.use(routes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
