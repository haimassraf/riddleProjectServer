import express from 'express';
import riddleRouter from './routers/riddeleRouter.js';
import playerRouter from './routers/playerRouter.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/riddle', riddleRouter)
app.use('/player', playerRouter)

app.listen(PORT, () => console.log(`Server listening on 'http://localhost:${PORT}'`));
