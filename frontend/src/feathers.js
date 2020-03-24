import io from 'socket.io-client';
import feathers from '@feathersjs/client';

function connect() {
  const socket = io();
  const client = feathers();
  client.configure(feathers.socketio(socket));
  return {client, socket}
}

export default connect
