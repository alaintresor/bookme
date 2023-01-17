import express from 'express';
import { Search } from '../../controllers/searchController';

const router = express.Router();

router.post('/',  Search);

export default router;
