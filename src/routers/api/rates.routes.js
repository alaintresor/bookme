import express from 'express';
import { createRate, getRates } from '../../controllers/rates.controller';
import { protect } from '../../controllers/authentication';

const rateRouter = express.Router();

rateRouter.post('/createRate', protect, createRate);
rateRouter.get('/getAll/:id', protect, getRates);

export default rateRouter;
