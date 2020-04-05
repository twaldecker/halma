import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import history from 'connect-history-api-fallback';
import d from "debug"
import express from 'express';
import {Server} from 'http';
import socket from 'socket.io';

const debug = d("server")
const app = express();
const server = new Server(app);
const io = socket(server)

server.listen(3030)

// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(history())
// Host the public folder
app.use('/', express.static('../frontend/build'));

let gameData = new Map()

io.on('connection', (socket) => {
  debug("new connection")
  let room: any = null

  socket.on('join', (data) => {
    room = data
    debug("join: "+room)
    socket.join(room, (err) => {
      debug("sending gameData after joining the room.")
      io.to(room).emit("game", gameData.get(room))
    })
  })
  socket.on("game", data => {
    debug("new game state in room: " +room)
    gameData.set(room, data)
    socket.to(room).emit("game", gameData.get(room))
  })
  socket.on("disconnect", data => {
    debug("disconnect from room: " + room)
  })
})

export default app;
