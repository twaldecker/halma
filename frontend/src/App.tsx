import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import connection from './feathers';

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

interface GameState {
  color: string
  row: number
  i: number
  sel: boolean
}


const initialGame2p: GameState[] = [
  {color: '#b00020', row: 12, i: 4, sel: false},
  {color: '#b00020', row: 12, i: 5, sel: false},
  {color: '#b00020', row: 12, i: 6, sel: false},
  {color: '#b00020', row: 12, i: 7, sel: false},
  {color: '#b00020', row: 12, i: 8, sel: false},
  {color: '#b00020', row: 13, i: 0, sel: false},
  {color: '#b00020', row: 13, i: 1, sel: false},
  {color: '#b00020', row: 13, i: 2, sel: false},
  {color: '#b00020', row: 13, i: 3, sel: false},
  {color: '#b00020', row: 14, i: 0, sel: false},
  {color: '#b00020', row: 14, i: 1, sel: false},
  {color: '#b00020', row: 14, i: 2, sel: false},
  {color: '#b00020', row: 15, i: 0, sel: false},
  {color: '#b00020', row: 15, i: 1, sel: false},
  {color: '#b00020', row: 16, i: 0, sel: false},

  {color: '#bb86fc', row: 0, i: 0, sel: false},
  {color: '#bb86fc', row: 1, i: 0, sel: false},
  {color: '#bb86fc', row: 1, i: 1, sel: false},
  {color: '#bb86fc', row: 2, i: 0, sel: false},
  {color: '#bb86fc', row: 2, i: 1, sel: false},
  {color: '#bb86fc', row: 2, i: 2, sel: false},
  {color: '#bb86fc', row: 3, i: 0, sel: false},
  {color: '#bb86fc', row: 3, i: 1, sel: false},
  {color: '#bb86fc', row: 3, i: 2, sel: false},
  {color: '#bb86fc', row: 3, i: 3, sel: false},
  {color: '#bb86fc', row: 4, i: 4, sel: false},
  {color: '#bb86fc', row: 4, i: 5, sel: false},
  {color: '#bb86fc', row: 4, i: 6, sel: false},
  {color: '#bb86fc', row: 4, i: 7, sel: false},
  {color: '#bb86fc', row: 4, i: 8, sel: false},
]

const initialGame3p: GameState[] = [
  {color: '#bb86fc', row: 4, i: 12, sel: false},
  {color: '#bb86fc', row: 4, i: 11, sel: false},
  {color: '#bb86fc', row: 4, i: 10, sel: false},
  {color: '#bb86fc', row: 4, i: 9, sel: false},
  {color: '#bb86fc', row: 4, i: 8, sel: false},
  {color: '#bb86fc', row: 5, i: 11, sel: false},
  {color: '#bb86fc', row: 5, i: 10, sel: false},
  {color: '#bb86fc', row: 5, i: 9, sel: false},
  {color: '#bb86fc', row: 5, i: 8, sel: false},
  {color: '#bb86fc', row: 6, i: 10, sel: false},
  {color: '#bb86fc', row: 6, i: 9, sel: false},
  {color: '#bb86fc', row: 6, i: 8, sel: false},
  {color: '#bb86fc', row: 7, i: 9, sel: false},
  {color: '#bb86fc', row: 7, i: 8, sel: false},
  {color: '#bb86fc', row: 8, i: 8, sel: false},

  {color: '#03dac6', row: 4, i: 0, sel: false},
  {color: '#03dac6', row: 4, i: 1, sel: false},
  {color: '#03dac6', row: 4, i: 2, sel: false},
  {color: '#03dac6', row: 4, i: 3, sel: false},
  {color: '#03dac6', row: 4, i: 4, sel: false},
  {color: '#03dac6', row: 5, i: 0, sel: false},
  {color: '#03dac6', row: 5, i: 1, sel: false},
  {color: '#03dac6', row: 5, i: 2, sel: false},
  {color: '#03dac6', row: 5, i: 3, sel: false},
  {color: '#03dac6', row: 6, i: 0, sel: false},
  {color: '#03dac6', row: 6, i: 1, sel: false},
  {color: '#03dac6', row: 6, i: 2, sel: false},
  {color: '#03dac6', row: 7, i: 0, sel: false},
  {color: '#03dac6', row: 7, i: 1, sel: false},
  {color: '#03dac6', row: 8, i: 0, sel: false},

  {color: '#b00020', row: 12, i: 4, sel: false},
  {color: '#b00020', row: 12, i: 5, sel: false},
  {color: '#b00020', row: 12, i: 6, sel: false},
  {color: '#b00020', row: 12, i: 7, sel: false},
  {color: '#b00020', row: 12, i: 8, sel: false},
  {color: '#b00020', row: 13, i: 0, sel: false},
  {color: '#b00020', row: 13, i: 1, sel: false},
  {color: '#b00020', row: 13, i: 2, sel: false},
  {color: '#b00020', row: 13, i: 3, sel: false},
  {color: '#b00020', row: 14, i: 0, sel: false},
  {color: '#b00020', row: 14, i: 1, sel: false},
  {color: '#b00020', row: 14, i: 2, sel: false},
  {color: '#b00020', row: 15, i: 0, sel: false},
  {color: '#b00020', row: 15, i: 1, sel: false},
  {color: '#b00020', row: 16, i: 0, sel: false},
]

const initialGame4p: GameState[] = [
  {color: '#bb86fc', row: 4, i: 12, sel: false},
  {color: '#bb86fc', row: 4, i: 11, sel: false},
  {color: '#bb86fc', row: 4, i: 10, sel: false},
  {color: '#bb86fc', row: 4, i: 9, sel: false},
  {color: '#bb86fc', row: 5, i: 11, sel: false},
  {color: '#bb86fc', row: 5, i: 10, sel: false},
  {color: '#bb86fc', row: 5, i: 9, sel: false},
  {color: '#bb86fc', row: 6, i: 10, sel: false},
  {color: '#bb86fc', row: 6, i: 9, sel: false},
  {color: '#bb86fc', row: 7, i: 9, sel: false},

  {color: '#03dac6', row: 4, i: 0, sel: false},
  {color: '#03dac6', row: 4, i: 1, sel: false},
  {color: '#03dac6', row: 4, i: 2, sel: false},
  {color: '#03dac6', row: 4, i: 3, sel: false},
  {color: '#03dac6', row: 5, i: 0, sel: false},
  {color: '#03dac6', row: 5, i: 1, sel: false},
  {color: '#03dac6', row: 5, i: 2, sel: false},
  {color: '#03dac6', row: 6, i: 0, sel: false},
  {color: '#03dac6', row: 6, i: 1, sel: false},
  {color: '#03dac6', row: 7, i: 0, sel: false},

  {color: '#f3dac6', row: 12, i: 0, sel: false},
  {color: '#f3dac6', row: 12, i: 1, sel: false},
  {color: '#f3dac6', row: 12, i: 2, sel: false},
  {color: '#f3dac6', row: 12, i: 3, sel: false},
  {color: '#f3dac6', row: 11, i: 0, sel: false},
  {color: '#f3dac6', row: 11, i: 1, sel: false},
  {color: '#f3dac6', row: 11, i: 2, sel: false},
  {color: '#f3dac6', row: 10, i: 0, sel: false},
  {color: '#f3dac6', row: 10, i: 1, sel: false},
  {color: '#f3dac6', row: 9, i: 0, sel: false},

  {color: '#f35ac3', row: 12, i: 9, sel: false},
  {color: '#f35ac3', row: 12, i: 10, sel: false},
  {color: '#f35ac3', row: 12, i: 11, sel: false},
  {color: '#f35ac3', row: 12, i: 12, sel: false},
  {color: '#f35ac3', row: 11, i: 9, sel: false},
  {color: '#f35ac3', row: 11, i: 10, sel: false},
  {color: '#f35ac3', row: 11, i: 11, sel: false},
  {color: '#f35ac3', row: 10, i: 9, sel: false},
  {color: '#f35ac3', row: 10, i: 10, sel: false},
  {color: '#f35ac3', row: 9, i: 9, sel: false},
]

const initialGame5p: GameState[] = [
  {color: '#bb86fc', row: 4, i: 12, sel: false},
  {color: '#bb86fc', row: 4, i: 11, sel: false},
  {color: '#bb86fc', row: 4, i: 10, sel: false},
  {color: '#bb86fc', row: 4, i: 9, sel: false},
  {color: '#bb86fc', row: 5, i: 11, sel: false},
  {color: '#bb86fc', row: 5, i: 10, sel: false},
  {color: '#bb86fc', row: 5, i: 9, sel: false},
  {color: '#bb86fc', row: 6, i: 10, sel: false},
  {color: '#bb86fc', row: 6, i: 9, sel: false},
  {color: '#bb86fc', row: 7, i: 9, sel: false},

  {color: '#03dac6', row: 4, i: 0, sel: false},
  {color: '#03dac6', row: 4, i: 1, sel: false},
  {color: '#03dac6', row: 4, i: 2, sel: false},
  {color: '#03dac6', row: 4, i: 3, sel: false},
  {color: '#03dac6', row: 5, i: 0, sel: false},
  {color: '#03dac6', row: 5, i: 1, sel: false},
  {color: '#03dac6', row: 5, i: 2, sel: false},
  {color: '#03dac6', row: 6, i: 0, sel: false},
  {color: '#03dac6', row: 6, i: 1, sel: false},
  {color: '#03dac6', row: 7, i: 0, sel: false},

  {color: '#f3dac6', row: 12, i: 0, sel: false},
  {color: '#f3dac6', row: 12, i: 1, sel: false},
  {color: '#f3dac6', row: 12, i: 2, sel: false},
  {color: '#f3dac6', row: 12, i: 3, sel: false},
  {color: '#f3dac6', row: 11, i: 0, sel: false},
  {color: '#f3dac6', row: 11, i: 1, sel: false},
  {color: '#f3dac6', row: 11, i: 2, sel: false},
  {color: '#f3dac6', row: 10, i: 0, sel: false},
  {color: '#f3dac6', row: 10, i: 1, sel: false},
  {color: '#f3dac6', row: 9, i: 0, sel: false},

  {color: '#f35ac3', row: 12, i: 9, sel: false},
  {color: '#f35ac3', row: 12, i: 10, sel: false},
  {color: '#f35ac3', row: 12, i: 11, sel: false},
  {color: '#f35ac3', row: 12, i: 12, sel: false},
  {color: '#f35ac3', row: 11, i: 9, sel: false},
  {color: '#f35ac3', row: 11, i: 10, sel: false},
  {color: '#f35ac3', row: 11, i: 11, sel: false},
  {color: '#f35ac3', row: 10, i: 9, sel: false},
  {color: '#f35ac3', row: 10, i: 10, sel: false},
  {color: '#f35ac3', row: 9, i: 9, sel: false},

  {color: '#b00020', row: 13, i: 0, sel: false},
  {color: '#b00020', row: 13, i: 1, sel: false},
  {color: '#b00020', row: 13, i: 2, sel: false},
  {color: '#b00020', row: 13, i: 3, sel: false},
  {color: '#b00020', row: 14, i: 0, sel: false},
  {color: '#b00020', row: 14, i: 1, sel: false},
  {color: '#b00020', row: 14, i: 2, sel: false},
  {color: '#b00020', row: 15, i: 0, sel: false},
  {color: '#b00020', row: 15, i: 1, sel: false},
  {color: '#b00020', row: 16, i: 0, sel: false},
]

const initialGame6p: GameState[] = [
  {color: '#bb86fc', row: 4, i: 12, sel: false},
  {color: '#bb86fc', row: 4, i: 11, sel: false},
  {color: '#bb86fc', row: 4, i: 10, sel: false},
  {color: '#bb86fc', row: 4, i: 9, sel: false},
  {color: '#bb86fc', row: 5, i: 11, sel: false},
  {color: '#bb86fc', row: 5, i: 10, sel: false},
  {color: '#bb86fc', row: 5, i: 9, sel: false},
  {color: '#bb86fc', row: 6, i: 10, sel: false},
  {color: '#bb86fc', row: 6, i: 9, sel: false},
  {color: '#bb86fc', row: 7, i: 9, sel: false},

  {color: '#03dac6', row: 4, i: 0, sel: false},
  {color: '#03dac6', row: 4, i: 1, sel: false},
  {color: '#03dac6', row: 4, i: 2, sel: false},
  {color: '#03dac6', row: 4, i: 3, sel: false},
  {color: '#03dac6', row: 5, i: 0, sel: false},
  {color: '#03dac6', row: 5, i: 1, sel: false},
  {color: '#03dac6', row: 5, i: 2, sel: false},
  {color: '#03dac6', row: 6, i: 0, sel: false},
  {color: '#03dac6', row: 6, i: 1, sel: false},
  {color: '#03dac6', row: 7, i: 0, sel: false},

  {color: '#f3dac6', row: 12, i: 0, sel: false},
  {color: '#f3dac6', row: 12, i: 1, sel: false},
  {color: '#f3dac6', row: 12, i: 2, sel: false},
  {color: '#f3dac6', row: 12, i: 3, sel: false},
  {color: '#f3dac6', row: 11, i: 0, sel: false},
  {color: '#f3dac6', row: 11, i: 1, sel: false},
  {color: '#f3dac6', row: 11, i: 2, sel: false},
  {color: '#f3dac6', row: 10, i: 0, sel: false},
  {color: '#f3dac6', row: 10, i: 1, sel: false},
  {color: '#f3dac6', row: 9, i: 0, sel: false},

  {color: '#f35ac3', row: 12, i: 9, sel: false},
  {color: '#f35ac3', row: 12, i: 10, sel: false},
  {color: '#f35ac3', row: 12, i: 11, sel: false},
  {color: '#f35ac3', row: 12, i: 12, sel: false},
  {color: '#f35ac3', row: 11, i: 9, sel: false},
  {color: '#f35ac3', row: 11, i: 10, sel: false},
  {color: '#f35ac3', row: 11, i: 11, sel: false},
  {color: '#f35ac3', row: 10, i: 9, sel: false},
  {color: '#f35ac3', row: 10, i: 10, sel: false},
  {color: '#f35ac3', row: 9, i: 9, sel: false},

  {color: '#b00020', row: 13, i: 0, sel: false},
  {color: '#b00020', row: 13, i: 1, sel: false},
  {color: '#b00020', row: 13, i: 2, sel: false},
  {color: '#b00020', row: 13, i: 3, sel: false},
  {color: '#b00020', row: 14, i: 0, sel: false},
  {color: '#b00020', row: 14, i: 1, sel: false},
  {color: '#b00020', row: 14, i: 2, sel: false},
  {color: '#b00020', row: 15, i: 0, sel: false},
  {color: '#b00020', row: 15, i: 1, sel: false},
  {color: '#b00020', row: 16, i: 0, sel: false},

  {color: '#7b753f', row: 0, i: 0, sel: false},
  {color: '#7b753f', row: 1, i: 0, sel: false},
  {color: '#7b753f', row: 1, i: 1, sel: false},
  {color: '#7b753f', row: 2, i: 0, sel: false},
  {color: '#7b753f', row: 2, i: 1, sel: false},
  {color: '#7b753f', row: 2, i: 2, sel: false},
  {color: '#7b753f', row: 3, i: 0, sel: false},
  {color: '#7b753f', row: 3, i: 1, sel: false},
  {color: '#7b753f', row: 3, i: 2, sel: false},
  {color: '#7b753f', row: 3, i: 3, sel: false},
]

const GameContext = React.createContext<{game: GameState[], setGame: (s: GameState[]) => void} | null>(null)

const Game = [1,2,3,4,13,12,11,10,9,10,11,12,13,4,3,2,1]

function height(length: number) {
  return Math.sqrt(length ** 2 - (length / 2) ** 2);
}

function Pin({x, y, pin, pinClick}: {x: number, y: number, pin: GameState, pinClick}) {
  return (
    <>
      <circle r="12" fill={pin.color} cx={x} cy={y} stroke={pin.sel?`#fff`:''} />
      <circle r="20" style={{fill: '#000', opacity: 0}} cx={x} cy={y} onClick={pinClick} />
    </>
  );
}

async function getInitialGameState(client, setGame) {
  if(client) {
    var game = await client.service('game').find()

    if (game.data.length != 0) {
      let gameData = game.data[0].data.game
      setGame(gameData)
    }
    else {
      setGame(initialGame2p);
    }
  }
}

function Hole(x: number, y: number, row: number, i: number) {
  const {game, setGame} = useContext(GameContext)!
  const currentCoordinates = n => n.row == row && n.i == i

  let pin = game.find(currentCoordinates)

  const pinClick = e => {
    e.stopPropagation()
    let newGame = game.filter(s => !currentCoordinates(s)).map(s => ({...s, sel: false}))
    newGame.push({...pin, sel: true} as GameState)
    setGame(newGame)
  }

  const holeClick = e => {
    e.stopPropagation()
    let pin = game.find(s => s.sel)
    if(pin){
      let newGame = game.filter(s => !s.sel);
      newGame.push({...pin, row, i} as GameState)
      setGame(newGame)
    }
  }

  if(pin)
    return <Pin x={x} y={y} pin={pin} pinClick={pinClick} />
  return (
    <>
      <circle r="3" fill="#e5e5e5" cx={x} cy={y} />
      <circle r="20" style={{fill: '#000', opacity: 0}} cx={x} cy={y} onClick={holeClick} />
    </>
  )
}

function Triangle({base, startx, starty, countLines}: {
  base: number,
  startx: number,
  starty: number,
  countLines: number
}) {
  let base_height = height(base);

  let lines: any[] = [];

  let smallTriangle = base / countLines;

  for (let i = 1; i < countLines; i++) {
    lines.push({
      ax: startx + (smallTriangle / 2) * i,
      ay: starty + height(smallTriangle) * i,
      bx: startx + base - (smallTriangle / 2) * i,
      by: starty + height(smallTriangle) * i,
      cx: startx + smallTriangle * i,
      cy: starty,
      dx: startx + base - smallTriangle * i,
      dy: starty
    });
  }

  return (
    <>
      <path
        d={`M ${startx} ${starty} l ${base} 0 l -${base / 2} ${base_height} z`}
        fill="none"
        stroke="#999"
      />
      {lines.map(i => (
        <path
          d={`M ${i.cx} ${i.cy} L ${i.ax} ${i.ay} L ${i.bx} ${i.by} L ${i.dx} ${i.dy}`}
          fill="none"
          stroke="#999"
        />
      ))}
    </>
  );
}

function HoleLine(x: number, y: number, row: number, step: number, base: number) {
  let holesX: number[] = [];
  let yPos = (line) => y + height(step) * line
  for (let i = 0; i < Game[row]; i++)
    holesX.push(x+i*step)

  return holesX.map((x, i) => Hole(x+base/2-step/2*(Game[row]-1), yPos(row), row, i))
}

function Holes({starty, base, startx, countLines}: {starty: number, base: number, startx: number, countLines: number}) {
  let smallTriangle = base / countLines;
  return (
    <>
      {HoleLine(startx, starty, 0, smallTriangle, base)}
      {HoleLine(startx, starty, 1, smallTriangle, base)}
      {HoleLine(startx, starty, 2, smallTriangle, base)}
      {HoleLine(startx, starty, 3, smallTriangle, base)}
      {HoleLine(startx, starty, 4, smallTriangle, base)}
      {HoleLine(startx, starty, 5, smallTriangle, base)}
      {HoleLine(startx, starty, 6, smallTriangle, base)}
      {HoleLine(startx, starty, 7, smallTriangle, base)}
      {HoleLine(startx, starty, 8, smallTriangle, base)}
      {HoleLine(startx, starty, 9, smallTriangle, base)}
      {HoleLine(startx, starty, 10, smallTriangle, base)}
      {HoleLine(startx, starty, 11, smallTriangle, base)}
      {HoleLine(startx, starty, 12, smallTriangle, base)}
      {HoleLine(startx, starty, 13, smallTriangle, base)}
      {HoleLine(startx, starty, 14, smallTriangle, base)}
      {HoleLine(startx, starty, 15, smallTriangle, base)}
      {HoleLine(startx, starty, 16, smallTriangle, base)}
    </>
  )
}

function App() {
  let base = 500;
  let startx = 20;
  let starty = 160;
  let holesStarty = 16;
  let countLines = 12;

  const channel = new URL(window.location.href).pathname

  const [game, setGame] = useState(initialGame2p)
  const [connectionCount, setConnectionCount] = useState(0)
  const [client, setClient] = useState<any>()
  const [anchorEl, setAnchorEl] = useState<any>(null)

  useEffect(() => {
    let {client, socket} = connection()
    setClient(client)

    getInitialGameState(client, setGame)

    client.service('connection').on('created', result => {
      setConnectionCount(result.data.connections)
    })

    client.service('game').on('updated', result => {
      setGame(result.data.game)
    })
    return () => {
      socket.close()
    }

  }, [])

  const setFeatherGame = (game: GameState[]) => {
    setGame(game)
    if(client){
      const gameService = client.service('game')

      gameService.find().then(result => {
        if (result.data.length == 0) {
          gameService.create({
            data: { channel, game }})
        } else {
          gameService.update(0, {data: {channel, game}})
        }
      });
    }
  }

  const unselect = _ => {
    let newGame = game.map(s => ({...s, sel: false}))
    setFeatherGame(newGame)
  }

  const newGame = state => {
    setFeatherGame(state)
    setAnchorEl(null)
  }

  return (
    <GameContext.Provider value={{game, setGame: setFeatherGame}}>
      <div className="game">
        <div className="topleft">
          <h1>Halma</h1>
          <div className="spielid">
            <span>Spiel ID: <a href={window.location.href}>{window.location.pathname.substr(1)}</a></span><br />
            <span>Teilnehmer: {connectionCount}</span>
          </div>
        </div>
        <div className="share">
          <a href={"whatsapp://send?text=Ich+möchte+mit+Dir+Halma+spielen.+Jetzt+hier+klicken:+"+window.location.href} data-action="share/whatsapp/share" target="_blank"><img src="whatsapp.png"></img></a>
        </div>

        <svg viewBox="0 0 540 620" style={{ maxHeight: "calc(100vh - 50px)", width: "100%" }} onClick={unselect}>
          <g><Triangle base={base} startx={startx} starty={starty} countLines={countLines} /></g>
          <g
            transform={`rotate(180, ${startx + base / 2}, ${starty +
              height(base) / 2}) translate(0, ${height(
                (4 * base) / countLines
                )})`}
                >
            <Triangle base={base} startx={startx} starty={starty} countLines={countLines} />
          </g>

          <Holes starty={holesStarty} base={base} startx={startx} countLines={countLines} />
        </svg>
        <button className="reset-button" onClick={e => setAnchorEl(e.currentTarget)}>Neues Spiel</button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}>
          <MenuItem onClick={_ => newGame(initialGame2p)}>2 Spieler</MenuItem>
          <MenuItem onClick={_ => newGame(initialGame3p)}>3 Spieler</MenuItem>
          <MenuItem onClick={_ => newGame(initialGame4p)}>4 Spieler</MenuItem>
          <MenuItem onClick={_ => newGame(initialGame5p)}>5 Spieler</MenuItem>
          <MenuItem onClick={_ => newGame(initialGame6p)}>6 Spieler</MenuItem>
        </Menu>
      </div>
    </GameContext.Provider>
  );
}

export default App;
