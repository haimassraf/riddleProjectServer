import express from 'express';
import { login, signup, logout } from '../controllers/auth.js';

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/signup', signup);
authRouter.get('/logout', logout);


export default authRouter;
