import express from 'express';
import riddleRouter from './routers/riddleRouter.js';
import playerRouter from './routers/playerRouter.js';
import "dotenv/config"

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/riddle', riddleRouter)
app.use('/player', playerRouter)

app.listen(PORT, () => console.log(`Server listening on 'http://localhost:${PORT}'`));
