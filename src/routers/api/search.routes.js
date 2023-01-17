import express from 'express';
import { Search } from '../../controllers/searchController';

const router = express.Router();

router.get('/',  Search);

export default router;
