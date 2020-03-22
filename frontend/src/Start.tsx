import React from "react";
import "./Start.css"

function Start() {
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
          placeholder="Spiel ID"
        />
        <div
          className="description"
        >
          Bei einem neuen Spiel können Sie das Feld leer lassen. Möchten Sie
          einem Spiel beitreten, geben Sie bitte die Spiel ID an.
        </div>
        <button className="start-button">
          Spiel starten oder beitreten
        </button>
      </div>
    </div>
  );
}

export default Start;
