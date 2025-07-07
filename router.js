import { getAllObjects } from "./controllers/riddleController.js";

export const router = {
    GET: {
        '/riddles': async (req, res) => {
            const data = await getAllObjects();
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(data))
        }
    },
    POST: {
        '/': (req, res) => {
            res.writeHead(201, "Succcess");
            res.end(JSON.stringify(req.body))
        }
    }
}