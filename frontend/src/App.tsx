import React from "react";
import "./App.css";

function height(length: number) {
  return Math.sqrt(length ** 2 - (length / 2) ** 2);
}

function App() {
  let base = 500;
  let base_height = height(base);


  let startx = 200;
  let starty = 200;

  let lines: any[] = [];

  let countLines = 20;
  let small_triangle = 500 / (countLines + 1);

  for(let i = 1; i <= countLines; i++) {
    lines.push({
      ax: startx + (small_triangle / 2) * i,
      ay: starty + height(small_triangle) * i,
      bx: startx + base - (small_triangle / 2) * i,
      by: starty + height(small_triangle) * i,
      cx: startx + small_triangle * i,
      cy: starty,
      dx: startx + base - small_triangle * i,
      dy: starty,
    });
  }

  return (
    <svg height="900" width="900">
      <path
        d={`M ${startx} ${starty} l ${base} 0 l -${base / 2} ${base_height} z`}
        fill="none"
        stroke="#999"
      />
      {lines.map(x => (
        <path d={`M ${x.cx} ${x.cy} L ${x.ax} ${x.ay} L ${x.bx} ${x.by} L ${x.dx} ${x.dy}`} fill="none" stroke="#999"/>
      ))}
    </svg>
  );
}

export default App;
