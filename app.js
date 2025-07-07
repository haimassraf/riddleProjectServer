import http from 'node:http';
import { router } from './router.js';

const server = http.createServer();
const PORT  = 3000;

function parsBody(req, res, cb) {
    if (req.body) {
        req.body = JSON.parse(req.body)
    }
    cb(req, res)
}

server.on('request', (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        req.body = body;
        parsBody(req, res, (router[req.method][req.url]));
    })
})

server.listen(PORT, () => console.log('listening...'));
