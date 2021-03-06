import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import generate from "project-name-generator";
import halma6 from "./assets/halma6.svg";
import muehle from "./assets/muehle.svg";
import pachisi from "./assets/pachisi.svg";
import dame from "./assets/dame.svg";
import wunderwald from "./assets/wunderwald.svg";

import {
  Button,
  makeStyles,
  Theme,
  TextField,
  Grid,
  Container,
  FormControl,
} from "@material-ui/core";
import clsx from "clsx";
import Ribbon from "./Ribbon";

const games = [
  {
    name: "Halma",
    img: halma6,
    url: 'halma',
    active: true,
  }, {
    name: "Mühle",
    img: muehle,
    url: 'muehle',
    active: true,
  },
  {
    name: "Dame",
    img: dame,
    url: 'dame',
    active: true,
  },
  {
    name: "Pachisi",
    img: pachisi,
    url: 'pachisi',
    active: false,
  },
];

const useStyles = makeStyles((theme: Theme) => ({
  gameTitle: {
    marginBottom: 5,
  },
  inactive: {
    opacity: 0.1,
  },
  logo: {
    width: 200,
    display: "block",
    margin: "0 auto",
  }
}));

function Start() {
  const history = useHistory();
  const [gameId, setGameId] = useState("");
  const classes = useStyles();

  const startButton = (game?) => {
    if (gameId) {
      history.push(gameId);
    } else {
      history.push(game.url + "/" + generate().dashed);
    }
  };

  return (
    <Container maxWidth="sm">
        <Ribbon><h1>Wunderwald Games</h1></Ribbon>
        <img src={wunderwald} alt="Wunderwald Logo" className={classes.logo}/>
        <p>
          Spiele Brettspiele, zum Beispiel Halma jetzt online mit deinen Freunden.
          Erstelle ein neues Spiel und teile den Link, damit deine Freunde beitreten können.
        </p>
        <h2>Spiel beitreten</h2>
        <FormControl fullWidth>
          <TextField
            type="text"
            name="room"
            variant="filled"
            size="small"
            value={gameId}
            placeholder="Spiel ID"
            onChange={x => setGameId(x.target.value)}
          />
        </FormControl>
        <p>
          Bei einem neuen Spiel können Sie das Feld leer lassen. Möchten Sie
          einem Spiel beitreten, geben Sie bitte die Spiel ID an.
        </p>
        <Button variant="contained" color="primary" disabled={!gameId } onClick={e => startButton()}>
          {gameId ? "Spiel beitreten" : "Spiel ID oben eintippen"}
        </Button>

        <h2>Neues Spiel</h2>

        <Grid container spacing={3}>
          {games.map((game, i) => (
            <Grid key={i} item xs={6} sm={3} onClick={_ => {if(game.active) startButton(game)}}>
              <h2 className={classes.gameTitle}>{game.name}</h2>
              <img src={game.img} alt={game.name + "preview"} className={clsx(!game.active?classes.inactive:false)}/>
              {!game.active? <div style={{position: "relative", top: -100, left: 0}}>bald verfügbar</div>:""}
            </Grid>
          ))}
        </Grid>
      </Container>
  );
}

export default Start;
