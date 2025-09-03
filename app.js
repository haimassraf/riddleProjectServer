import express from 'express';
import riddleRouter from './routers/riddleRouter.js';
import playerRouter from './routers/playerRouter.js';
import authRouter from './routers/authRouter.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import "dotenv/config"

const app = express();
const PORT = process.env.PORT;

app.use(cors('*'));
app.use(express.json());
app.use(cookieParser());

app.use('/riddle', riddleRouter)
app.use('/player', playerRouter)
app.use('/auth', authRouter)

app.listen(PORT, () => console.log(`Server listening on 'http://localhost:${PORT}'`));
