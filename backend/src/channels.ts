import '@feathersjs/transport-commons';
//import { HookContext } from '@feathersjs/feathers';
import { Application } from './declarations';
var MatomoTracker = require('matomo-tracker');
var matomo = new MatomoTracker(2, 'https://analytics.joomla-upgrade-service.de/matomo.php');

export default function(app: Application) {
  if(typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  matomo.on('error', (err: any) => {
    console.log('error tracking request: ', err);
  });

  let channelConnections: any = [];

  app.on('connection', async (connection: any) =>  {
    let channel = new URL(connection.headers.referer).pathname

    if (channelConnections[channel] == undefined) {
      channelConnections[channel] = 0;
    }
    channelConnections[channel]++;

    matomo.track({
      url: 'http://halma.wunderwald.games/',
      action_name: 'Connected User'
    });

    app.service('connection').create({data: {channel, connections: channelConnections[channel]}})
    app.channel(channel).join(connection);
  });

  app.on('disconnect', (connection: any) => {
    let channel = new URL(connection.headers.referer).pathname
    channelConnections[channel]--;
    app.service('connection').create({data: {channel, connections: channelConnections[channel]}})
  })

  app.publish((msg: any) => {
    //msg.data.channel.connections = channelConnections[msg.data.channel.data.channel];
    //console.log(msg.data.channel.updated);
    return app.channel(msg.data.channel);
  });

};
