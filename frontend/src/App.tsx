import React, { useState } from "react";
import io from 'socket.io-client';
import "./App.css";
import client from './feathers';


const messageService = client.service('game');

messageService.on('created', message => console.log('Created a message', message));

interface GameState {
  color: string
  row: number
  i: number
  sel: boolean
}

function height(length: number) {
  return Math.sqrt(length ** 2 - (length / 2) ** 2);
}

function Pin(x: number, y: number, pin: GameState, pinClick) {
  return (
    <circle r="8" fill={pin.color} cx={x} cy={y} stroke={pin.sel?`#000`:''} onClick={pinClick} />
  );
}

function Hole(x: number, y: number, row: number, i: number, game: GameState[], setGame) {

  const currentCoordinates = n => n.row == row && n.i == i

  let pin = game.find(currentCoordinates)

  const pinClick = _ => {
    let newGame = game.filter(s => !currentCoordinates(s)).map(s => ({...s, sel: false}))
    newGame.push({...pin, sel: true} as GameState)
    setGame(newGame)
  }

  const holeClick = _ => {
    let pin = game.find(s => s.sel)
    if(pin){
      let newGame = game.filter(s => !s.sel);
      newGame.push({...pin, row, i} as GameState)
      setGame(newGame)
    }
    else {
      console.log("no pin selected!")
    }

  }

  if(pin)
    return Pin(x, y, pin, pinClick)
  return (
    <>
      <circle r="3" fill="#777" cx={x} cy={y} />
      <circle r="15" style={{fill: '#000', opacity: 0}} cx={x} cy={y} onClick={holeClick} />
    </>
  )
}

function Triangle(
  base: number,
  startx: number,
  starty: number,
  countLines: number
) {
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

function HoleLine(x: number, y: number, row: number, step: number, base: number, game, setGame) {
  let holesX: number[] = [];
  let yPos = (line) => y + height(step) * line
  for (let i = 0; i < Game[row]; i++)
    holesX.push(x+i*step)

  return holesX.map((x, i) => Hole(x+base/2-step/2*(Game[row]-1), yPos(row), row, i, game, setGame))
}

const Game = [1,2,3,4,13,12,11,10,9,10,11,12,13,4,3,2,1]

function Holes(base: number, startx: number, countLines: number, game, setGame) {
  let smallTriangle = base / countLines;
  let starty = 6
  return (
    <>
      {HoleLine(startx, starty, 0, smallTriangle, base, game, setGame)}
      {HoleLine(startx, starty, 1, smallTriangle, base, game, setGame)}
      {HoleLine(startx, starty, 2, smallTriangle, base, game, setGame)}
      {HoleLine(startx, starty, 3, smallTriangle, base, game, setGame)}
      {HoleLine(startx, starty, 4, smallTriangle, base, game, setGame)}
      {HoleLine(startx, starty, 5, smallTriangle, base, game, setGame)}
      {HoleLine(startx, starty, 6, smallTriangle, base, game, setGame)}
      {HoleLine(startx, starty, 7, smallTriangle, base, game, setGame)}
      {HoleLine(startx, starty, 8, smallTriangle, base, game, setGame)}
      {HoleLine(startx, starty, 9, smallTriangle, base, game, setGame)}
      {HoleLine(startx, starty, 10, smallTriangle, base, game, setGame)}
      {HoleLine(startx, starty, 11, smallTriangle, base, game, setGame)}
      {HoleLine(startx, starty, 12, smallTriangle, base, game, setGame)}
      {HoleLine(startx, starty, 13, smallTriangle, base, game, setGame)}
      {HoleLine(startx, starty, 14, smallTriangle, base, game, setGame)}
      {HoleLine(startx, starty, 15, smallTriangle, base, game, setGame)}
      {HoleLine(startx, starty, 16, smallTriangle, base, game, setGame)}
    </>
  )
}

function App() {
  let base = 500;
  let startx = 10;
  let starty = 150;
  let countLines = 12;

  let initialGame: GameState[] = [
    {color: '#00f', row: 4, i: 12, sel: false},
    {color: '#00f', row: 4, i: 11, sel: false},
    {color: '#00f', row: 4, i: 10, sel: false},
    {color: '#00f', row: 4, i: 9, sel: false},
    {color: '#00f', row: 4, i: 8, sel: false},
    {color: '#00f', row: 5, i: 11, sel: false},
    {color: '#00f', row: 5, i: 10, sel: false},
    {color: '#00f', row: 5, i: 9, sel: false},
    {color: '#00f', row: 5, i: 8, sel: false},
    {color: '#00f', row: 6, i: 10, sel: false},
    {color: '#00f', row: 6, i: 9, sel: false},
    {color: '#00f', row: 6, i: 8, sel: false},
    {color: '#00f', row: 7, i: 9, sel: false},
    {color: '#00f', row: 7, i: 8, sel: false},
    {color: '#00f', row: 8, i: 8, sel: false},

    {color: '#0f0', row: 4, i: 0, sel: false},
    {color: '#0f0', row: 4, i: 1, sel: false},
    {color: '#0f0', row: 4, i: 2, sel: false},
    {color: '#0f0', row: 4, i: 3, sel: false},
    {color: '#0f0', row: 4, i: 4, sel: false},
    {color: '#0f0', row: 5, i: 0, sel: false},
    {color: '#0f0', row: 5, i: 1, sel: false},
    {color: '#0f0', row: 5, i: 2, sel: false},
    {color: '#0f0', row: 5, i: 3, sel: false},
    {color: '#0f0', row: 6, i: 0, sel: false},
    {color: '#0f0', row: 6, i: 1, sel: false},
    {color: '#0f0', row: 6, i: 2, sel: false},
    {color: '#0f0', row: 7, i: 0, sel: false},
    {color: '#0f0', row: 7, i: 1, sel: false},
    {color: '#0f0', row: 8, i: 0, sel: false},

    {color: '#f00', row: 12, i: 4, sel: false},
    {color: '#f00', row: 12, i: 5, sel: false},
    {color: '#f00', row: 12, i: 6, sel: false},
    {color: '#f00', row: 12, i: 7, sel: false},
    {color: '#f00', row: 12, i: 8, sel: false},
    {color: '#f00', row: 13, i: 0, sel: false},
    {color: '#f00', row: 13, i: 1, sel: false},
    {color: '#f00', row: 13, i: 2, sel: false},
    {color: '#f00', row: 13, i: 3, sel: false},
    {color: '#f00', row: 14, i: 0, sel: false},
    {color: '#f00', row: 14, i: 1, sel: false},
    {color: '#f00', row: 14, i: 2, sel: false},
    {color: '#f00', row: 15, i: 0, sel: false},
    {color: '#f00', row: 15, i: 1, sel: false},
    {color: '#f00', row: 16, i: 0, sel: false},
  ]

  const [game, setGame] = useState(initialGame);

  const feathersSetGame = async game => {
    await client.service('game').update(1, {data: game});
    setGame(game)
  }


  return (
    <svg viewBox="0 0 520 600" style={{ maxHeight: "100vh", width: "100%" }}>
      <g>{Triangle(base, startx, starty, countLines)}</g>
      <g
        transform={`rotate(180, ${startx + base / 2}, ${starty +
          height(base) / 2}) translate(0, ${height(
          (4 * base) / countLines
        )})`}
      >
        {Triangle(base, startx, starty, countLines)}
      </g>

      {Holes(base, startx, countLines, game, feathersSetGame)}
    </svg>
  );
}

export default App;
