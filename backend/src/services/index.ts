import { Application } from '../declarations';
import game from './game/game.service';
import connection from './connection/connection.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(game);
  app.configure(connection);
}
