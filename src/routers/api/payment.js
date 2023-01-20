
import express from 'express';
import { paying } from '../../controllers/paymentController.js';
import { paymentGate } from '../../controllers/paymentGateway.js';

const router = express.Router();

router.post('/', paymentGate);
router.post('/pay', paying);

export default router;