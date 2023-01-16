import express from 'express';
import { searchTrip } from '../../controllers/search.controllers.js';

import { protect } from '../../controllers/authentication';

const router = express.Router();

router.get('/:searchTerm', protect, searchTrip);

export default router;
