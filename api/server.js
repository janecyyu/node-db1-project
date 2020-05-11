const express = require("express");
const userRouter = require("../users/userRouter");
const server = express();

server.use(express.json());

server.use("/api", userRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
