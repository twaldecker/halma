// Initializes the `game` service on path `/game`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Game } from './game.class';
import hooks from './game.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'game': Game & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    paginate: app.get('paginate'),
    room: app.get('room')
  };

  // Initialize our service with any options it requires
  app.use('/game', new Game(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('game');

  service.hooks(hooks);
}
