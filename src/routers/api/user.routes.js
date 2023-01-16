import express from 'express';
import { login, protect } from '../../controllers/Authentication.js';
import { createUser, getAllUsers } from '../../services/user.service.js';
const router = express.Router();

// router.get('/',protect, getAllUsers);
router.post('/create', createUser);
router.post('/login', login);

export default router;
