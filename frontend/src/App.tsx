import React from "react";
import "./App.css";

function height(length: number) {
  return Math.sqrt(length ** 2 - (length / 2) ** 2);
}

function Triangle(base: number, startx: number, starty: number, countLines: number) {
  let base_height = height(base);

  let lines: any[] = [];

  let small_triangle = 500 / (countLines + 1);

  for (let i = 1; i <= countLines; i++) {
    lines.push({
      ax: startx + (small_triangle / 2) * i,
      ay: starty + height(small_triangle) * i,
      bx: startx + base - (small_triangle / 2) * i,
      by: starty + height(small_triangle) * i,
      cx: startx + small_triangle * i,
      cy: starty,
      dx: startx + base - small_triangle * i,
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
      {lines.map(x => (
        <path
        d={`M ${x.cx} ${x.cy} L ${x.ax} ${x.ay} L ${x.bx} ${x.by} L ${x.dx} ${x.dy}`}
        fill="none"
        stroke="#999"
        />
        ))}
    </>
  );
}

function App() {
  let base = 500;

  let startx = 10;
  let starty = 150;

  let countLines = 11;

  return (
    <svg viewBox="0 0 520 600" style={{maxHeight: '100vh', width: '100%'}}>
      <g>{Triangle(base, startx, starty, countLines)}</g>
      <g transform={`rotate(180, ${startx + base/2}, ${starty+height(base)/2}) translate(0, ${height(4*base/(countLines+1))})`}>
      {Triangle(base, startx, starty, countLines)}
      </g>
    </svg>
  );
}

export default App;
