import express from 'express';
import apiRouter from './api/index';
import roomRouter from './api/room.routes.js';
import accomodation from './api/accomodation.routes.js';

const allRoutes = express.Router();

allRoutes.get('/', (req, res) => {
  res.json({ message: 'Welcome to barefoot!' });
});

allRoutes.use('/api/v1', apiRouter);
allRoutes.use('/api/v1/accomodation', accomodation);
allRoutes.use('/api/v1/rooms', roomRouter);

export default allRoutes;
