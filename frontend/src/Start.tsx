import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import generate from "project-name-generator";
import halma6 from "./assets/halma6.svg";
import muehle from "./assets/muehle.svg";
import {
  MobileStepper,
  Button,
  Container,
  useTheme,
  makeStyles,
  Theme,
  TextField,
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const games = [
  {
    name: "Halma",
    img: halma6,
    url: 'halma'
  },
  {
    name: "Mühle",
    img: muehle,
    url: 'muehle'
  }
];

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    position: 'fixed',
    maxWidth: 500,
    left: 0,
    right: 0,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: `0 16px 16px 16px`,
    margin: `0 auto`,
  },
  image: {
    flexShrink: 1,
    maxHeight: 300,
  }
}));

function Start() {
  const history = useHistory();
  const [gameId, setGameId] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [game, setGame] = useState(0);
  const theme = useTheme();
  const classes = useStyles();

  const go = game => {
    if (!gameId) {
    } else {
      history.push(gameId);
    }
  };

  const startButton = () => {
    if (gameId) {
      history.push(gameId);
    } else {
      history.push(games[game].url + "/" + generate().dashed);
    }
  };

  return (
    <div className={classes.main}>
        <h1>Brettspiele online</h1>
        <p>
          Spiele Brettspiele, zum Beispiel Halma jetzt online mit deinen Freunden.
          Erstelle ein neues Spiel und teile den Link, damit deine Freunde beitreten können.
        </p>
        <SwipeableViews index={game}>
          {games.map((game, i) => (
            <div key={i} style={{display: 'flex', flexDirection: 'column'}}>
              <h2>{game.name}</h2>
              <img src={game.img} className={classes.image} />
            </div>
          ))}
        </SwipeableViews>
        <MobileStepper
          steps={games.length}
          position="static"
          variant="text"
          activeStep={game}
          nextButton={
            <Button
              size="small"
              onClick={_ => setGame(game + 1)}
              disabled={game === games.length - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={_ => setGame(game - 1)}
              disabled={game === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />

        <TextField
          type="text"
          name="room"
          variant="filled"
          size="small"
          value={gameId}
          placeholder="Spiel ID"
          onChange={x => setGameId(x.target.value)}
        />
        <p>
          Bei einem neuen Spiel können Sie das Feld leer lassen. Möchten Sie
          einem Spiel beitreten, geben Sie bitte die Spiel ID an.
        </p>
        <Button variant="contained" color="primary" disabled={!gameId && game == 1} onClick={e => startButton()}>
          {gameId ? "Spiel beitreten" : (game == 1) ? "kommt bald" :"neues Spiel erstellen"}
        </Button>
      </div>
  );
}

export default Start;
