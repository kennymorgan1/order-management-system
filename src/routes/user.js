import express from 'express';
import dotenv from 'dotenv';
import UserController from '../controllers/user';
import UserValidation from '../validators/uservalidator';

dotenv.config();
const router = express.Router();

router.post('/signup', UserValidation.createUser, UserController.createUser);

router.post('/login', UserController.loginUser);

router.delete('/:userId', UserController.deleteUser);

export default router;
