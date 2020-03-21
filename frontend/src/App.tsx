import React, { useState } from "react";
import "./App.css";

function height(length: number) {
  return Math.sqrt(length ** 2 - (length / 2) ** 2);
}

function Pin(x: number, y: number, color: string) {
  return (
    <>
      <circle r="5" fill={color} cx={x} cy={y}></circle>
    </>
  );
}

function Hole(x: number, y: number, row: number, i: number, game) {
  if(game[0].row == row && game[0].i == i)
    return Pin(x, y, game[0].color)
  return (
    <circle r="3" fill="#333" cx={x} cy={y} />
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

function HoleLine(x: number, y: number, row: number, step: number, base: number, game) {
  let holesX: number[] = [];
  let yPos = (line) => y + height(step) * line
  for (let i = 0; i < Game[row]; i++)
    holesX.push(x+i*step)

  return holesX.map((x, i) => Hole(x+base/2-step/2*(Game[row]-1), yPos(row), row, i, game))
}

const Game = [1,2,3,4,13,12,11,10,9,10,11,12,13,4,3,2,1]

function Holes(base: number, startx: number, countLines: number, game) {
  let smallTriangle = base / countLines;
  let starty = 6
  return (
    <>
      {HoleLine(startx, starty, 0, smallTriangle, base, game)}
      {HoleLine(startx, starty, 1, smallTriangle, base, game)}
      {HoleLine(startx, starty, 2, smallTriangle, base, game)}
      {HoleLine(startx, starty, 3, smallTriangle, base, game)}
      {HoleLine(startx, starty, 4, smallTriangle, base, game)}
      {HoleLine(startx, starty, 5, smallTriangle, base, game)}
      {HoleLine(startx, starty, 6, smallTriangle, base, game)}
      {HoleLine(startx, starty, 7, smallTriangle, base, game)}
      {HoleLine(startx, starty, 8, smallTriangle, base, game)}
      {HoleLine(startx, starty, 9, smallTriangle, base, game)}
      {HoleLine(startx, starty, 10, smallTriangle, base, game)}
      {HoleLine(startx, starty, 11, smallTriangle, base, game)}
      {HoleLine(startx, starty, 12, smallTriangle, base, game)}
      {HoleLine(startx, starty, 13, smallTriangle, base, game)}
      {HoleLine(startx, starty, 14, smallTriangle, base, game)}
      {HoleLine(startx, starty, 15, smallTriangle, base, game)}
      {HoleLine(startx, starty, 16, smallTriangle, base, game)}
    </>
  )
}

function App() {
  let base = 500;
  let startx = 10;
  let starty = 150;
  let countLines = 12;

  //const [game, setGame] = useState([]);

  let game = [{color: '#f0f', row: 3, i: 2}]


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

      {Holes(base, startx, countLines, game)}
    </svg>
  );
}

export default App;
