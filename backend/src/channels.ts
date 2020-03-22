import '@feathersjs/transport-commons';
import { HookContext } from '@feathersjs/feathers';
import { Application } from './declarations';

export default function(app: Application) {
  if(typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  let channelConnections: any = [];

  app.on('connection', (connection: any) => {
    let channel = new URL(connection.headers.referer).pathname

    if (channelConnections[channel] == undefined) {
      channelConnections[channel] = 0;  
    }

    channelConnections[channel]++;
    //console.log("Connections: " + channel + ": " + channelConnections[channel]);
    app.channel(channel).join(connection);
  });

  app.on('disconnect', (connection: any) => {
    let channel = new URL(connection.headers.referer).pathname
    channelConnections[channel]--;
    //console.log("Disconnected from " + channel);
    //console.log("Connections: " + channel + ": " + channelConnections[channel]);
  })

  app.publish((msg: any) => {
    //msg.data.channel.connections = channelConnections[msg.data.channel.data.channel];
    //console.log(msg.data.channel.updated);
    return app.channel(msg.data.channel);
  });

};
