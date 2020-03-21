import React from "react";
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

function Hole(x: number, y: number) {
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

function HoleLine(x: number, y: number, count: number, step: number) {
  let holesX: number[] = [];

  for (let i = 0; i < count; i++)
    holesX.push(x+i*step)

  return holesX.map(x => Hole(x, y))
}

function Holes(base: number, startx: number, countLines: number) {
  let smallTriangle = base / countLines;
  let yPos = (line) => starty+height(smallTriangle)*line
  let starty = 6
  return (
    <>
      {HoleLine(startx+base/2, yPos(0), 1, smallTriangle)}
      {HoleLine(startx+base/2-smallTriangle/2*1, yPos(1), 2, smallTriangle)}
      {HoleLine(startx+base/2-smallTriangle/2*2, yPos(2), 3, smallTriangle)}
      {HoleLine(startx+base/2-smallTriangle/2*3, yPos(3), 4, smallTriangle)}
      {HoleLine(startx+smallTriangle/2*0, yPos(4), 13, smallTriangle)}
      {HoleLine(startx+smallTriangle/2*1, yPos(5), 12, smallTriangle)}
      {HoleLine(startx+smallTriangle/2*2, yPos(6), 11, smallTriangle)}
      {HoleLine(startx+smallTriangle/2*3, yPos(7), 10, smallTriangle)}
      {HoleLine(startx+smallTriangle/2*4, yPos(8), 9, smallTriangle)}
      {HoleLine(startx+smallTriangle/2*3, yPos(9), 10, smallTriangle)}
      {HoleLine(startx+smallTriangle/2*2, yPos(10), 11, smallTriangle)}
      {HoleLine(startx+smallTriangle/2*1, yPos(11), 12, smallTriangle)}
      {HoleLine(startx+smallTriangle/2*0, yPos(12), 13, smallTriangle)}
      {HoleLine(startx+base/2-smallTriangle/2*3, yPos(13), 4, smallTriangle)}
      {HoleLine(startx+base/2-smallTriangle/2*2, yPos(14), 3, smallTriangle)}
      {HoleLine(startx+base/2-smallTriangle/2*1, yPos(15), 2, smallTriangle)}
      {HoleLine(startx+base/2, yPos(16), 1, smallTriangle)}
    </>
  )
}

function App() {
  let base = 500;

  let startx = 10;
  let starty = 150;

  let countLines = 12;

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

      {Holes(base, startx, countLines)}
    </svg>
  );
}

export default App;
