
import express from 'express';
import {paymentGate} from '../../controllers/paymentGateway.js';

const router = express.Router();

router.post('/',paymentGate);

export default router;