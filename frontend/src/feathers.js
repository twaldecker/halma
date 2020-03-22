import io from 'socket.io-client';
import feathers from '@feathersjs/client';

const socket = io('http://gameapi.qurdo.com');
const client = feathers();

client.configure(feathers.socketio(socket));

export default client;
