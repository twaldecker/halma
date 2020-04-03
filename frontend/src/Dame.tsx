import React, { useState, useEffect, useContext } from "react";
import "./Halma.css";
import connection from "./feathers";
import { motion } from "framer-motion";
import whatsappImage from "./assets/whatsapp.png"
import d from "debug"
import Link from "@material-ui/core/Link";

const debug = d("dame")

interface GameState {
  id: number;
  color: string;
  j: number;
  i: number;
  dame: boolean;
  sel: boolean;
}

const initialGame2p: GameState[] = [
  { id: 1, color: "#FF9800", j: 0, i: 1, dame: false, sel: false },
  { id: 2, color: "#FF9800", j: 0, i: 3, dame: false, sel: false },
  { id: 3, color: "#FF9800", j: 0, i: 5, dame: false, sel: false },
  { id: 4, color: "#FF9800", j: 0, i: 7, dame: false, sel: false },
  { id: 5, color: "#FF9800", j: 1, i: 0, dame: false, sel: false },
  { id: 6, color: "#FF9800", j: 1, i: 2, dame: false, sel: false },
  { id: 7, color: "#FF9800", j: 1, i: 4, dame: false, sel: false },
  { id: 8, color: "#FF9800", j: 1, i: 6, dame: false, sel: false },
  { id: 9, color: "#FF9800", j: 2, i: 1, dame: false, sel: false },
  { id: 10, color: "#FF9800", j: 2, i: 3, dame: false, sel: false },
  { id: 11, color: "#FF9800", j: 2, i: 5, dame: false, sel: false },
  { id: 12, color: "#FF9800", j: 2, i: 7, dame: false, sel: false },

  { id: 13, color: "#00BCD4", j: 5, i: 0, dame: false, sel: false },
  { id: 14, color: "#00BCD4", j: 5, i: 2, dame: false, sel: false },
  { id: 15, color: "#00BCD4", j: 5, i: 4, dame: false, sel: false },
  { id: 16, color: "#00BCD4", j: 5, i: 6, dame: false, sel: false },
  { id: 17, color: "#00BCD4", j: 6, i: 1, dame: false, sel: false },
  { id: 18, color: "#00BCD4", j: 6, i: 3, dame: false, sel: false },
  { id: 19, color: "#00BCD4", j: 6, i: 5, dame: false, sel: false },
  { id: 20, color: "#00BCD4", j: 6, i: 7, dame: false, sel: false },
  { id: 21, color: "#00BCD4", j: 7, i: 0, dame: false, sel: false },
  { id: 22, color: "#00BCD4", j: 7, i: 2, dame: false, sel: false },
  { id: 23, color: "#00BCD4", j: 7, i: 4, dame: false, sel: false },
  { id: 24, color: "#00BCD4", j: 7, i: 6, dame: false, sel: false },
];

const base = 40

const GameContext = React.createContext<{
  game: GameState[];
  setGame: (s: GameState[]) => void;
} | null>(null);

async function getInitialGameState(client, setGame) {
  debug("Get initial game State.")
  if (client) {
    var game = await client.service("game").find();

    if (game.data.length != 0) {
      debug("Game state found.")
      let gameData = game.data[0].data.game;
      debug("gameData:")
      debug(gameData)
      setGame(gameData);
    } else {
      debug("No game data available. Setting initial Game.")
      setGame(initialGame2p);
    }
  } else {
    debug("No client to find game State.")
  }
}

function position(i: number, j: number) {
  return {
    x: i*base+base/2,
    y: j*base+ base/2,
  };
}

function Pin({ pin }: { pin: GameState }) {
  const { game, setGame } = useContext(GameContext)!;
  const { x, y } = position(pin.i, pin.j);

  const currentCoordinates = n => n.j === pin.j && n.i === pin.i;

  const pinClick = e => {
    e.stopPropagation();
    let newGame = game
      .filter(s => !currentCoordinates(s))
      .map(s => ({ ...s, sel: false }));
    newGame.push({ ...pin, sel: true } as GameState);
    setGame(newGame);
  };

  let selectionMark = (
    <g>
      {[0, 120, 240].map((e, i) => (
        <g key={i} transform={`translate(0, -15) rotate(${e}, 0, 15)`}>
          <path
            d={`M 0 0 l -5 -6 l 10 0 l -5 6`}
            fill="#fff"
            className="selectionArrow"
          />
        </g>
      ))}
    </g>
  );

  return (
    <motion.g animate={{ x, y }} transition={{ duration: 0.3 }} className="pin">
      {pin.sel? selectionMark : ""}
      <circle r="12" fill={pin.color} cx="0" cy="0" />
      <circle
        r="30"
        style={{ fill: "#000", opacity: 0 }}
        cx="0"
        cy="0"
        onClick={pinClick}
      />
      {pin.dame? <circle r="4" fill="none" stroke="#000" onClick={pinClick}/>:""}
    </motion.g>
  );
}


function Rect({i,j}: {i: number, j: number}) {
  const { game, setGame } = useContext(GameContext)!;

  const holeClick = e => {
    console.log("click i,j:"+[i,j])
    e.stopPropagation();
    let pin = game.find(s => s.sel);
    let newGame = game;

    if (pin) {

      if(j%2 != i%2) { // only black fields

        const idiff= i-pin.i
        const jdiff= j-pin.j

        if(Math.abs(idiff) === Math.abs(jdiff)) { // darf nur schräg laufen

          const ci = i => i + (idiff/Math.abs(idiff))
          const cj = j => j + (jdiff/Math.abs(jdiff))
          let ir = ci(pin.i)
          let jr = cj(pin.j)

          // finde übersprungene
          while (jr != j && ir != i) {
            console.log(`ir: ${ir} jr: ${jr}`)

            let res = game.find(m => m.i == ir && m.j == jr)

            ir = ci(ir)
            jr = cj(jr)
            if(res) {
              // wenn übersprungene, muss im nächsten feld gelandet werden
              // nur andere farbe schlagen
              //
              if(i === ir && j === jr && pin.color !== res.color && ((Math.abs(idiff)===2 && Math.abs(jdiff)===2) || pin.dame) ) {
                // lösche den übersprungenen
                newGame = game.filter(m => !(m.i == (res!).i && m.j == (res!).j))
              } else {
                return
              }
            }
          }

          // setze neue position
          setGame(
            newGame.map(item => {
              if (item.sel) return {
                ...item, i, j,
                dame: (((item.id > 12 && j == 0) || (item.id <= 12 && j == 7)) && !item.dame)? true: item.dame
              } as GameState;
              return item;
            })
          );
        }
      }
    }
  };
  return (
    <rect x={i*base} y={j*base} height={base} width={base} stroke="none" fill="#ccc" style={{opacity: (j%2 == i%2) ? 1:0}} onClick={holeClick}/>
  )
}

function Spielfeld() {
  return (
    <>
      <rect x={0} y={0} height={8*base} width={8*base} stroke="#fff" fill="none"/>
      {[0,1,2,3,4,5,6,7].map(i =>
        {return [0,1,2,3,4,5,6,7].map(j =>
          <Rect i={i} j={j} key={j} />
        )}
      )}
    </>
  );
}

function Pins() {
  const { game, setGame } = useContext(GameContext)!;

  return (
    <>
      {game.map(pin => (
        <Pin key={pin.id} pin={pin} />
      ))}
    </>
  );
}

function Dame() {
  const channel = new URL(window.location.href).pathname;

  const [game, setGame] = useState(initialGame2p);
  const [connectionCount, setConnectionCount] = useState(0);
  const [client, setClient] = useState<any>();
  const [anchorEl, setAnchorEl] = useState<any>(null);

  useEffect(() => {
    debug("Connecting")
    let { client, socket } = connection();
    setClient(client);

    getInitialGameState(client, setGame);

    client.service("connection").on("created", result => {
      setConnectionCount(result.data.connections);
    });

    client.service("game").on("updated", result => {
      debug("Got a Game update from server.")
      setGame(result.data.game);
    });
    return () => {
      debug("Closing connection.")
      socket.close();
    };
  }, []);

  const setFeatherGame = (game: GameState[]) => {
    setGame(game);
    if (client) {
      const gameService = client.service("game");

      gameService.find().then(result => {
        if (result.data.length == 0) {
          gameService.create({
            data: { channel, game }
          });
        } else {
          gameService.update(0, { data: { channel, game } });
        }
      });
    }
  };

  const unselect = _ => {
    let newGame = game.map(s => ({ ...s, sel: false }));
    setFeatherGame(newGame);
  };

  const newGame = state => {
    if (window.confirm("Neues spiel?")) {
      setFeatherGame(state);
    }
    setAnchorEl(null);
  };

  return (
    <GameContext.Provider value={{ game, setGame: setFeatherGame }}>
      <div className="game">
        <div className="topleft">
          <h1>Dame</h1>
          <div className="spielid">
            <span>
              Spiel ID: <Link underline={"always"} href={window.location.href}>
                {window.location.pathname.substr(1)}
              </Link>
            </span>
            <br />
            <span>Teilnehmer: {connectionCount}</span>
          </div>
        </div>
        <div className="share">
          <a
            href={
              "whatsapp://send?text=Ich+möchte+mit+Dir+Halma+spielen.+Jetzt+hier+klicken:+" +
              window.location.href
            }
            data-action="share/whatsapp/share"
            target="_blank"
          >
            <img src={whatsappImage} />
          </a>
        </div>

        <svg viewBox={`-10 -10 ${8*base+20} ${8*base+20}`} onClick={unselect}>
          <Spielfeld />

          <Pins />
        </svg>
        <button className="reset-button" onClick={e => newGame(initialGame2p)}>Neues Spiel</button>
      </div>
    </GameContext.Provider>
  );
}

export default Dame;
