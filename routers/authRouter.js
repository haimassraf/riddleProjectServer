import express from 'express';
import { login } from '../auth/login.js';
import { signup } from '../auth/signup.js';
import { logout } from '../auth/logout.js';
import { authMiddleware } from '../auth/authMiddleware.js';

const authRouter = express.Router();


authRouter.post('/login', login);
authRouter.post('/signup', signup);
authRouter.get('/logout', logout);


export default authRouter;
