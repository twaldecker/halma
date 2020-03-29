import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Halma from './Halma';
import Muehle from './Muehle';
import * as serviceWorker from './serviceWorker';
import Start from './Start';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/halma/:id">
          <Halma />
        </Route>
        <Route path="/muehle/:id">
          <Muehle />
        </Route>
        <Route path="/">
          <Start />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
