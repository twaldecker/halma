import React from 'react';
import ReactDOM from 'react-dom';
import Halma from './Halma.js';
import Muehle from './Muehle.js';
import Pachisi from './Pachisi.js';
import Dame from './Dame.js';
import * as serviceWorker from './serviceWorker.js';
import Start from './Start.js';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import theme from './theme.js';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/halma/:id">
            <Halma />
          </Route>
          <Route path="/muehle/:id">
            <Muehle />
          </Route>
          <Route path="/pachisi/:id">
            <Pachisi />
          </Route>
          <Route path="/dame/:id">
            <Dame />
          </Route>
          <Route path="/">
            <Start />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
