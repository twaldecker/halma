import '@feathersjs/transport-commons';
import { HookContext } from '@feathersjs/feathers';
import { Application } from './declarations';

export default function(app: Application) {
  if(typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', (connection: any) => {
    let channel = new URL(connection.headers.referer).pathname
    app.channel(channel).join(connection);
  });

  app.publish((msg: any) => {
    return app.channel(msg.data.channel);
  });

};
