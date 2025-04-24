import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import history from 'connect-history-api-fallback';
import d from "debug"
import express from 'express';
import {Server} from 'http';
import {Server as SocketServer} from 'socket.io';
import track, {actions} from './tracker'

const debug = d("server")
const app = express();
const server = new Server(app);
const io = new SocketServer(server)

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

  socket.on('join', async (data) => {
    room = data
    debug("join: "+room)
    track(socket.id, actions.connect, room)

    await socket.join(room);
    debug("sending gameData after joining the room.")
    io.to(room).emit("game", gameData.get(room))
    let num = io.sockets.adapter.rooms.get(room)?.size;
    debug("connected clients: " + num)
    io.to(room).emit("connections", num)
  })
  socket.on("game", data => {
    debug("new game state in room: " +room)
    track(socket.id, actions.update, room)
    gameData.set(room, data)
    socket.to(room).emit("game", gameData.get(room))
  })
  socket.on("disconnect", data => {
    debug("disconnect from room: " + room)
    track(socket.id, actions.disconnect, room)
    let rooms = io.sockets.adapter.rooms
    if(rooms.get(room)) {
      debug("connected clients: " +rooms.get(room)?.size)
      io.to(room).emit("connections", rooms.get(room)?.size)
    }

  })
})

export default app;
