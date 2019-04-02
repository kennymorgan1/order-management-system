import express from 'express';
import dotenv from 'dotenv';
import UserController from '../controllers/user';

dotenv.config();
const router = express.Router();

router.post('/signup', UserController.createUser);

router.post('/login', UserController.loginUser);

router.delete('/:userId', UserController.deleteUser);

export default router;
