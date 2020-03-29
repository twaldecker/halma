import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import connection from './feathers';
import { motion } from "framer-motion"

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

interface GameState {
  id: number
  color: string
  row: number
  i: number
  sel: boolean
}


const initialGame2p: GameState[] = [
  {id: 1, color: '#FF9800', row: 12, i: 4, sel: false},
  {id: 2, color: '#FF9800', row: 12, i: 5, sel: false},
  {id: 3, color: '#FF9800', row: 12, i: 6, sel: false},
  {id: 4, color: '#FF9800', row: 12, i: 7, sel: false},
  {id: 5, color: '#FF9800', row: 12, i: 8, sel: false},
  {id: 6, color: '#FF9800', row: 13, i: 0, sel: false},
  {id: 7, color: '#FF9800', row: 13, i: 1, sel: false},
  {id: 8, color: '#FF9800', row: 13, i: 2, sel: false},
  {id: 9, color: '#FF9800', row: 13, i: 3, sel: false},
  {id: 10, color: '#FF9800', row: 14, i: 0, sel: false},
  {id: 11, color: '#FF9800', row: 14, i: 1, sel: false},
  {id: 12, color: '#FF9800', row: 14, i: 2, sel: false},
  {id: 13, color: '#FF9800', row: 15, i: 0, sel: false},
  {id: 14, color: '#FF9800', row: 15, i: 1, sel: false},
  {id: 15, color: '#FF9800', row: 16, i: 0, sel: false},

  {id: 16, color: '#00BCD4', row: 0, i: 0, sel: false},
  {id: 17, color: '#00BCD4', row: 1, i: 0, sel: false},
  {id: 18, color: '#00BCD4', row: 1, i: 1, sel: false},
  {id: 19, color: '#00BCD4', row: 2, i: 0, sel: false},
  {id: 20, color: '#00BCD4', row: 2, i: 1, sel: false},
  {id: 21, color: '#00BCD4', row: 2, i: 2, sel: false},
  {id: 22, color: '#00BCD4', row: 3, i: 0, sel: false},
  {id: 23, color: '#00BCD4', row: 3, i: 1, sel: false},
  {id: 24, color: '#00BCD4', row: 3, i: 2, sel: false},
  {id: 25, color: '#00BCD4', row: 3, i: 3, sel: false},
  {id: 26, color: '#00BCD4', row: 4, i: 4, sel: false},
  {id: 27, color: '#00BCD4', row: 4, i: 5, sel: false},
  {id: 28, color: '#00BCD4', row: 4, i: 6, sel: false},
  {id: 29, color: '#00BCD4', row: 4, i: 7, sel: false},
  {id: 30, color: '#00BCD4', row: 4, i: 8, sel: false},
]

const initialGame3p: GameState[] = [
  {id: 10, color: '#EF5350', row: 4, i: 12, sel: false},
  {id: 11, color: '#EF5350', row: 4, i: 11, sel: false},
  {id: 12, color: '#EF5350', row: 4, i: 10, sel: false},
  {id: 13, color: '#EF5350', row: 4, i: 9, sel: false},
  {id: 14, color: '#EF5350', row: 4, i: 8, sel: false},
  {id: 15, color: '#EF5350', row: 5, i: 11, sel: false},
  {id: 16, color: '#EF5350', row: 5, i: 10, sel: false},
  {id: 17, color: '#EF5350', row: 5, i: 9, sel: false},
  {id: 18, color: '#EF5350', row: 5, i: 8, sel: false},
  {id: 19, color: '#EF5350', row: 6, i: 10, sel: false},
  {id: 20, color: '#EF5350', row: 6, i: 9, sel: false},
  {id: 21, color: '#EF5350', row: 6, i: 8, sel: false},
  {id: 22, color: '#EF5350', row: 7, i: 9, sel: false},
  {id: 23, color: '#EF5350', row: 7, i: 8, sel: false},
  {id: 24, color: '#EF5350', row: 8, i: 8, sel: false},

  {id: 30, color: '#9C27B0', row: 4, i: 0, sel: false},
  {id: 31, color: '#9C27B0', row: 4, i: 1, sel: false},
  {id: 32, color: '#9C27B0', row: 4, i: 2, sel: false},
  {id: 33, color: '#9C27B0', row: 4, i: 3, sel: false},
  {id: 34, color: '#9C27B0', row: 4, i: 4, sel: false},
  {id: 35, color: '#9C27B0', row: 5, i: 0, sel: false},
  {id: 36, color: '#9C27B0', row: 5, i: 1, sel: false},
  {id: 37, color: '#9C27B0', row: 5, i: 2, sel: false},
  {id: 38, color: '#9C27B0', row: 5, i: 3, sel: false},
  {id: 39, color: '#9C27B0', row: 6, i: 0, sel: false},
  {id: 40, color: '#9C27B0', row: 6, i: 1, sel: false},
  {id: 41, color: '#9C27B0', row: 6, i: 2, sel: false},
  {id: 42, color: '#9C27B0', row: 7, i: 0, sel: false},
  {id: 43, color: '#9C27B0', row: 7, i: 1, sel: false},
  {id: 44, color: '#9C27B0', row: 8, i: 0, sel: false},

  {id: 50, color: '#8BC34A', row: 12, i: 4, sel: false},
  {id: 51, color: '#8BC34A', row: 12, i: 5, sel: false},
  {id: 52, color: '#8BC34A', row: 12, i: 6, sel: false},
  {id: 53, color: '#8BC34A', row: 12, i: 7, sel: false},
  {id: 54, color: '#8BC34A', row: 12, i: 8, sel: false},
  {id: 55, color: '#8BC34A', row: 13, i: 0, sel: false},
  {id: 56, color: '#8BC34A', row: 13, i: 1, sel: false},
  {id: 57, color: '#8BC34A', row: 13, i: 2, sel: false},
  {id: 58, color: '#8BC34A', row: 13, i: 3, sel: false},
  {id: 59, color: '#8BC34A', row: 14, i: 0, sel: false},
  {id: 60, color: '#8BC34A', row: 14, i: 1, sel: false},
  {id: 61, color: '#8BC34A', row: 14, i: 2, sel: false},
  {id: 62, color: '#8BC34A', row: 15, i: 0, sel: false},
  {id: 63, color: '#8BC34A', row: 15, i: 1, sel: false},
  {id: 64, color: '#8BC34A', row: 16, i: 0, sel: false},
]

const initialGame4p: GameState[] = [
  {id: 11, color: '#EF5350', row: 4, i: 12, sel: false},
  {id: 12, color: '#EF5350', row: 4, i: 11, sel: false},
  {id: 13, color: '#EF5350', row: 4, i: 10, sel: false},
  {id: 14, color: '#EF5350', row: 4, i: 9, sel: false},
  {id: 15, color: '#EF5350', row: 5, i: 11, sel: false},
  {id: 16, color: '#EF5350', row: 5, i: 10, sel: false},
  {id: 17, color: '#EF5350', row: 5, i: 9, sel: false},
  {id: 18, color: '#EF5350', row: 6, i: 10, sel: false},
  {id: 19, color: '#EF5350', row: 6, i: 9, sel: false},
  {id: 10, color: '#EF5350', row: 7, i: 9, sel: false},

  {id: 21, color: '#FFEB3B', row: 4, i: 0, sel: false},
  {id: 22, color: '#FFEB3B', row: 4, i: 1, sel: false},
  {id: 23, color: '#FFEB3B', row: 4, i: 2, sel: false},
  {id: 24, color: '#FFEB3B', row: 4, i: 3, sel: false},
  {id: 25, color: '#FFEB3B', row: 5, i: 0, sel: false},
  {id: 26, color: '#FFEB3B', row: 5, i: 1, sel: false},
  {id: 27, color: '#FFEB3B', row: 5, i: 2, sel: false},
  {id: 28, color: '#FFEB3B', row: 6, i: 0, sel: false},
  {id: 29, color: '#FFEB3B', row: 6, i: 1, sel: false},
  {id: 20, color: '#FFEB3B', row: 7, i: 0, sel: false},

  {id: 31, color: '#8BC34A', row: 12, i: 0, sel: false},
  {id: 32, color: '#8BC34A', row: 12, i: 1, sel: false},
  {id: 33, color: '#8BC34A', row: 12, i: 2, sel: false},
  {id: 34, color: '#8BC34A', row: 12, i: 3, sel: false},
  {id: 35, color: '#8BC34A', row: 11, i: 0, sel: false},
  {id: 36, color: '#8BC34A', row: 11, i: 1, sel: false},
  {id: 37, color: '#8BC34A', row: 11, i: 2, sel: false},
  {id: 38, color: '#8BC34A', row: 10, i: 0, sel: false},
  {id: 39, color: '#8BC34A', row: 10, i: 1, sel: false},
  {id: 30, color: '#8BC34A', row: 9, i: 0, sel: false},

  {id: 41, color: '#9C27B0', row: 12, i: 9, sel: false},
  {id: 42, color: '#9C27B0', row: 12, i: 10, sel: false},
  {id: 43, color: '#9C27B0', row: 12, i: 11, sel: false},
  {id: 44, color: '#9C27B0', row: 12, i: 12, sel: false},
  {id: 45, color: '#9C27B0', row: 11, i: 9, sel: false},
  {id: 46, color: '#9C27B0', row: 11, i: 10, sel: false},
  {id: 47, color: '#9C27B0', row: 11, i: 11, sel: false},
  {id: 48, color: '#9C27B0', row: 10, i: 9, sel: false},
  {id: 49, color: '#9C27B0', row: 10, i: 10, sel: false},
  {id: 40, color: '#9C27B0', row: 9, i: 9, sel: false},
]

const initialGame5p: GameState[] = [
  {id: 11, color: '#EF5350', row: 4, i: 12, sel: false},
  {id: 12, color: '#EF5350', row: 4, i: 11, sel: false},
  {id: 13, color: '#EF5350', row: 4, i: 10, sel: false},
  {id: 14, color: '#EF5350', row: 4, i: 9, sel: false},
  {id: 15, color: '#EF5350', row: 5, i: 11, sel: false},
  {id: 16, color: '#EF5350', row: 5, i: 10, sel: false},
  {id: 17, color: '#EF5350', row: 5, i: 9, sel: false},
  {id: 18, color: '#EF5350', row: 6, i: 10, sel: false},
  {id: 19, color: '#EF5350', row: 6, i: 9, sel: false},
  {id: 10, color: '#EF5350', row: 7, i: 9, sel: false},

  {id: 21, color: '#FFEB3B', row: 4, i: 0, sel: false},
  {id: 22, color: '#FFEB3B', row: 4, i: 1, sel: false},
  {id: 23, color: '#FFEB3B', row: 4, i: 2, sel: false},
  {id: 24, color: '#FFEB3B', row: 4, i: 3, sel: false},
  {id: 25, color: '#FFEB3B', row: 5, i: 0, sel: false},
  {id: 26, color: '#FFEB3B', row: 5, i: 1, sel: false},
  {id: 27, color: '#FFEB3B', row: 5, i: 2, sel: false},
  {id: 28, color: '#FFEB3B', row: 6, i: 0, sel: false},
  {id: 29, color: '#FFEB3B', row: 6, i: 1, sel: false},
  {id: 20, color: '#FFEB3B', row: 7, i: 0, sel: false},

  {id: 31, color: '#8BC34A', row: 12, i: 0, sel: false},
  {id: 32, color: '#8BC34A', row: 12, i: 1, sel: false},
  {id: 33, color: '#8BC34A', row: 12, i: 2, sel: false},
  {id: 34, color: '#8BC34A', row: 12, i: 3, sel: false},
  {id: 35, color: '#8BC34A', row: 11, i: 0, sel: false},
  {id: 36, color: '#8BC34A', row: 11, i: 1, sel: false},
  {id: 37, color: '#8BC34A', row: 11, i: 2, sel: false},
  {id: 38, color: '#8BC34A', row: 10, i: 0, sel: false},
  {id: 39, color: '#8BC34A', row: 10, i: 1, sel: false},
  {id: 30, color: '#8BC34A', row: 9, i: 0, sel: false},

  {id: 41, color: '#9C27B0', row: 12, i: 9, sel: false},
  {id: 42, color: '#9C27B0', row: 12, i: 10, sel: false},
  {id: 43, color: '#9C27B0', row: 12, i: 11, sel: false},
  {id: 44, color: '#9C27B0', row: 12, i: 12, sel: false},
  {id: 45, color: '#9C27B0', row: 11, i: 9, sel: false},
  {id: 46, color: '#9C27B0', row: 11, i: 10, sel: false},
  {id: 47, color: '#9C27B0', row: 11, i: 11, sel: false},
  {id: 48, color: '#9C27B0', row: 10, i: 9, sel: false},
  {id: 49, color: '#9C27B0', row: 10, i: 10, sel: false},
  {id: 40, color: '#9C27B0', row: 9, i: 9, sel: false},

  {id: 51, color: '#FF9800', row: 13, i: 0, sel: false},
  {id: 52, color: '#FF9800', row: 13, i: 1, sel: false},
  {id: 53, color: '#FF9800', row: 13, i: 2, sel: false},
  {id: 54, color: '#FF9800', row: 13, i: 3, sel: false},
  {id: 55, color: '#FF9800', row: 14, i: 0, sel: false},
  {id: 56, color: '#FF9800', row: 14, i: 1, sel: false},
  {id: 57, color: '#FF9800', row: 14, i: 2, sel: false},
  {id: 58, color: '#FF9800', row: 15, i: 0, sel: false},
  {id: 59, color: '#FF9800', row: 15, i: 1, sel: false},
  {id: 50, color: '#FF9800', row: 16, i: 0, sel: false},
]

const initialGame6p: GameState[] = [
  {id: 11, color: '#EF5350', row: 4, i: 12, sel: false},
  {id: 12, color: '#EF5350', row: 4, i: 11, sel: false},
  {id: 13, color: '#EF5350', row: 4, i: 10, sel: false},
  {id: 14, color: '#EF5350', row: 4, i: 9, sel: false},
  {id: 15, color: '#EF5350', row: 5, i: 11, sel: false},
  {id: 16, color: '#EF5350', row: 5, i: 10, sel: false},
  {id: 17, color: '#EF5350', row: 5, i: 9, sel: false},
  {id: 18, color: '#EF5350', row: 6, i: 10, sel: false},
  {id: 19, color: '#EF5350', row: 6, i: 9, sel: false},
  {id: 10, color: '#EF5350', row: 7, i: 9, sel: false},

  {id: 21, color: '#FFEB3B', row: 4, i: 0, sel: false},
  {id: 22, color: '#FFEB3B', row: 4, i: 1, sel: false},
  {id: 23, color: '#FFEB3B', row: 4, i: 2, sel: false},
  {id: 24, color: '#FFEB3B', row: 4, i: 3, sel: false},
  {id: 25, color: '#FFEB3B', row: 5, i: 0, sel: false},
  {id: 26, color: '#FFEB3B', row: 5, i: 1, sel: false},
  {id: 27, color: '#FFEB3B', row: 5, i: 2, sel: false},
  {id: 28, color: '#FFEB3B', row: 6, i: 0, sel: false},
  {id: 29, color: '#FFEB3B', row: 6, i: 1, sel: false},
  {id: 20, color: '#FFEB3B', row: 7, i: 0, sel: false},

  {id: 31, color: '#8BC34A', row: 12, i: 0, sel: false},
  {id: 32, color: '#8BC34A', row: 12, i: 1, sel: false},
  {id: 33, color: '#8BC34A', row: 12, i: 2, sel: false},
  {id: 34, color: '#8BC34A', row: 12, i: 3, sel: false},
  {id: 35, color: '#8BC34A', row: 11, i: 0, sel: false},
  {id: 36, color: '#8BC34A', row: 11, i: 1, sel: false},
  {id: 37, color: '#8BC34A', row: 11, i: 2, sel: false},
  {id: 38, color: '#8BC34A', row: 10, i: 0, sel: false},
  {id: 39, color: '#8BC34A', row: 10, i: 1, sel: false},
  {id: 30, color: '#8BC34A', row: 9, i: 0, sel: false},

  {id: 41, color: '#9C27B0', row: 12, i: 9, sel: false},
  {id: 42, color: '#9C27B0', row: 12, i: 10, sel: false},
  {id: 43, color: '#9C27B0', row: 12, i: 11, sel: false},
  {id: 44, color: '#9C27B0', row: 12, i: 12, sel: false},
  {id: 45, color: '#9C27B0', row: 11, i: 9, sel: false},
  {id: 46, color: '#9C27B0', row: 11, i: 10, sel: false},
  {id: 47, color: '#9C27B0', row: 11, i: 11, sel: false},
  {id: 48, color: '#9C27B0', row: 10, i: 9, sel: false},
  {id: 49, color: '#9C27B0', row: 10, i: 10, sel: false},
  {id: 40, color: '#9C27B0', row: 9, i: 9, sel: false},

  {id: 51, color: '#FF9800', row: 13, i: 0, sel: false},
  {id: 52, color: '#FF9800', row: 13, i: 1, sel: false},
  {id: 53, color: '#FF9800', row: 13, i: 2, sel: false},
  {id: 54, color: '#FF9800', row: 13, i: 3, sel: false},
  {id: 55, color: '#FF9800', row: 14, i: 0, sel: false},
  {id: 56, color: '#FF9800', row: 14, i: 1, sel: false},
  {id: 57, color: '#FF9800', row: 14, i: 2, sel: false},
  {id: 58, color: '#FF9800', row: 15, i: 0, sel: false},
  {id: 59, color: '#FF9800', row: 15, i: 1, sel: false},
  {id: 50, color: '#FF9800', row: 16, i: 0, sel: false},

  {id: 61, color: '#00BCD4', row: 0, i: 0, sel: false},
  {id: 62, color: '#00BCD4', row: 1, i: 0, sel: false},
  {id: 63, color: '#00BCD4', row: 1, i: 1, sel: false},
  {id: 64, color: '#00BCD4', row: 2, i: 0, sel: false},
  {id: 65, color: '#00BCD4', row: 2, i: 1, sel: false},
  {id: 66, color: '#00BCD4', row: 2, i: 2, sel: false},
  {id: 67, color: '#00BCD4', row: 3, i: 0, sel: false},
  {id: 68, color: '#00BCD4', row: 3, i: 1, sel: false},
  {id: 69, color: '#00BCD4', row: 3, i: 2, sel: false},
  {id: 60, color: '#00BCD4', row: 3, i: 3, sel: false},
]

const GameContext = React.createContext<{game: GameState[], setGame: (s: GameState[]) => void} | null>(null)

const Game = [1,2,3,4,13,12,11,10,9,10,11,12,13,4,3,2,1]

const base = 500;
const startx = 20;
const starty = 160;
const holesStarty = 16;
const countLines = 12;
const smallTriangle = base / countLines;

function height(length: number) {
  return Math.sqrt(length ** 2 - (length / 2) ** 2);
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

function position(row: number, i: number) {
  return {
    x: ((startx+i*smallTriangle)+base/2-smallTriangle/2*(Game[row]-1)),
    y: holesStarty + height(smallTriangle) * row
  }
}

function Pin({pin}: {pin: GameState}) {
  const {game, setGame} = useContext(GameContext)!
  const {x, y} = position(pin.row, pin.i)

  const currentCoordinates = n => n.row === pin.row && n.i === pin.i

  const pinClick = e => {
    e.stopPropagation()
    let newGame = game.filter(s => !currentCoordinates(s)).map(s => ({...s, sel: false}))
    newGame.push({...pin, sel: true} as GameState)
    setGame(newGame)
  }

  let selectionMark = <g></g>
  if(pin.sel) {
    selectionMark = <g>
      {[0, 120, 240].map(e => <g transform={`translate(0, -15) rotate(${e}, 0, 15)`}>
          <path d={`M 0 0 l -5 -6 l 10 0 l -5 6`} fill="#fff" className="selectionArrow"/>
        </g>
      )}
    </g>
  }

  return (
    <motion.g animate={{x, y}} transition={{duration: .3}} className="pin">
      {selectionMark}
      <circle r="12" fill={pin.color} cx="0" cy="0" />
      <circle r="20" style={{fill: '#000', opacity: 0}} cx="0" cy="0" onClick={pinClick} />
    </motion.g>
  );
}

function Hole({row, i}:{row: number, i: number}) {
  const {game, setGame} = useContext(GameContext)!
  const {x, y} = position(row, i);

  const holeClick = e => {
    e.stopPropagation()
    let pin = game.find(s => s.sel)
    if(pin){
      setGame(game.map((item, key) => {
        if(item.sel) return {...item, row, i} as GameState
        return item
      }))
    }
  }

  return (
    <>
      <circle r="3" fill="#e5e5e5" cx={x} cy={y} />
      <circle r="20" style={{fill: '#000', opacity: 0}} cx={x} cy={y} onClick={holeClick} />
    </>
  )
}

function Triangle() {
  let base_height = height(base);

  let lines: any[] = [];

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

function Holes() {
  return (<>
    {[...Game.keys()].map(row => {
      return [...Array(Game[row])].map((x, i) =>
        <Hole row={row} i={i} key={i} />)
      }
    )}
  </>)
}

function Pins() {
  const {game, setGame} = useContext(GameContext)!

  return (<>
    {game.map(pin => <Pin key={pin.id} pin={pin} />)}
  </>)

}

function App() {
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


        <svg viewBox="0 0 540 620" onClick={unselect}>
          <g><Triangle /></g>
          <g
            transform={`rotate(180, ${startx + base / 2}, ${starty +
              height(base) / 2}) translate(0, ${height(
                (4 * base) / countLines
                )})`}
                >
            <Triangle />
          </g>

          <Holes />
          <Pins />
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
