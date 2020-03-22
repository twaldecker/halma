import React, { useState } from "react";
import "./Start.css"
import { useHistory } from "react-router-dom";
import generate from 'project-name-generator';

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
      <div className="wrapper">
        <h1>
          Halma
        </h1>
        <p>
          Das Brettspiel HALMA, jetzt online. Macht doch einfach mal etwas neues
          und spielt gemeinsam Brettspiele über das Internet. Generiert euch ein
          neues Halma Spiel mit dem folgenden Button, teilt diesen Link mit
          euren Freunden und spielt gemeinsam.
        </p>
        <img
          src="halma.png"
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
        <button className="start-button" onClick={go}>
          Spiel starten oder beitreten
        </button>
      </div>
    </div>
  );
}

export default Start;
