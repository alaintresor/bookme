import 'dotenv/config';
import app from './app';
import socket from './utils/socket.io';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});

socket.socketFunction.socketStarter(server);
