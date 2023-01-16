import emitter from './eventEmitter';
import jwt from 'jsonwebtoken';
import db from '../database/models/index';
import 'dotenv/config';
const io = require('socket.io')();

const { Notifications } = db;

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const findNotifications = async (id) => {
  return Notifications.findAll({ where: { userId: id, read: false } });
};

const socketFunction = {};
socketFunction.socketStarter = (server) => {
  io.attach(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    },
  });
  io.on('connection', async (socket) => {
    console.log('connected! with token ', socket.handshake.auth.token);
    emitter.on('notification', async () => {
      const token = socket.handshake.auth.token;
      const userData = verifyToken(token);
      const data = await findNotifications(userData.id);
      socket.emit('newNotification', data);
    });
  });
};
export default { socketFunction, io };
