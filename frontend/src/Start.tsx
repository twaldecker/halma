import React, { useState } from "react";
import "./Start.css"
import { useHistory } from "react-router-dom";
import generate from 'project-name-generator';
import halma6 from './assets/halma6.svg';

function Start() {
  const history = useHistory();
  const [gameId, setGameId] = useState("");

  const go = () => {
    if(!gameId) {
      history.push(generate().dashed)
    } else {
      history.push(gameId);
    }
  }

  return (
    <div className="start">
      <h1>
        Halma
      </h1>
      <p className="description">
        Das Brettspiel HALMA, jetzt online. Macht doch einfach mal etwas neues
        und spielt gemeinsam Brettspiele über das Internet. Generiert euch ein
        neues Halma Spiel mit dem folgenden Button, teilt diesen Link mit
        euren Freunden und spielt gemeinsam.
      </p>
      <img
        src={halma6} alt="Halma Spielfeld"
      />

      <input
        type="text"
        name="room"
        value={gameId}
        placeholder="Spiel ID"
        onChange={(x) => setGameId(x.target.value)}
      />
      <div
        className="description"
      >
        Bei einem neuen Spiel können Sie das Feld leer lassen. Möchten Sie
        einem Spiel beitreten, geben Sie bitte die Spiel ID an.
      </div>
      <button onClick={go}>
        Spiel starten oder beitreten
      </button>
    </div>
  );
}

export default Start;
