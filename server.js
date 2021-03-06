const createError = require("http-errors");
const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const socket_io = require("socket.io");
const jwt = require("jsonwebtoken");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config({ path: ".env" });

const app = express();

// connect to DB
mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true 
})
.then(() => console.log("Mongo connected"))
.catch(err => console.log(err));;

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on("error", (err) => {
  console.error(err.message);
});

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("autoIndex", false);
//ff
// require("./models/post");
// require("./models/user");
// require("./models/comment");
// require("./models/commentreply");
// require("./models/commentreplylike");
// require("./models/commentlike");
// require("./models/postlike");
// require("./models/following");
// require("./models/followers");
// require("./models/notification");
// require("./models/chatroom");
// require("./models/message");

const io = socket_io();

const userController = require("./controllers/usercontroller");

app.io = io;

app.set("socketio", io);

io.use((socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    const token = socket.handshake.query.token.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) return next(new Error("Authentication error"));
      socket.userData = decoded;
      next();
    });
  } else {
    next(new Error("Authentication error"));
  }
}).on("connection", (socket) => {
  // Connection now authenticated to receive further events
  socket.join(socket.userData.userId);
  io.in(socket.userData.userId).clients((err, clients) => {
    userController.changeStatus(socket.userData.userId, clients, io);
    //console.log(clients);
  });
  socket.on("typing", (data) => {
    socket.to(data.userId).emit("typing", { roomId: data.roomId });
  });
  socket.on("stoppedTyping", (data) => {
    socket.to(data.userId).emit("stoppedTyping", { roomId: data.roomId });
  });
  socket.on("disconnect", () => {
    socket.leave(socket.userData.userId);
    io.in(socket.userData.userId).clients((err, clients) => {
      userController.changeStatus(socket.userData.userId, clients, io);
      //console.log(clients);
    });
  });
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
});

const postsRouter = require("./routes/post");
const usersRouter = require("./routes/user");
const commentsRouter = require("./routes/comment");
const notificationRouter = require("./routes/notification");
const chatRouter = require("./routes/chat");

app.use(helmet());
if (process.env.NODE_ENV === "production") {
  app.use(limiter);
  app.use(
    logger("common", {
      stream: fs.createWriteStream("./access.log", { flags: "a" }),
    })
  );
} else {
  app.use(logger("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/post/", postsRouter);
app.use("/api/user/", usersRouter);
app.use("/api/comment/", commentsRouter);
app.use("/api/notification/", notificationRouter);
app.use("/api/chat/", chatRouter);

// app.get("/auth/reset/password/:jwt", function (req, res) {
//   return res.status(404).json({ message: "go to port 3000" });
// });

if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));
    app.get('*', (req,res)=>{
      res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'));
    });  
  }
//listen
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});