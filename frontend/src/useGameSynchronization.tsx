import React, { useState, useEffect } from "react";
import io from 'socket.io-client'
import d from "debug";

const debug = d("game:synchronization")

function useGameSynchronization(channel: string, initialGame: any) {

  const [game, setGame] = useState(initialGame);
  const [connectionCount, setConnectionCount] = useState(0);
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    let socketServer = "localhost:3030"
    debug("Connecting to: "+ socketServer)
    let socket = io(socketServer);
    setSocket(socket);

    socket.on("game", (game) => {
      debug("Got a Game update from server.")
      if(game)  {
        setGame(game);
      } else {
        debug("Game was null!")
        socket.emit("game", initialGame)
      }
    })

    socket.on("connections", setConnectionCount)

    debug("joining channel: " +channel)
    socket.emit("join", channel)

    return () => {
      debug("Closing connection.")
      socket.close();
    };
  }, [])

  const setFeatherGame = (game: any) => {
    setGame(game);
    if (socket) {
      debug("emit game")
      socket.emit("game", game);
    }
  };


  return {
    game,
    connectionCount,
    setGame: setFeatherGame,
  };
}

export default useGameSynchronization;
