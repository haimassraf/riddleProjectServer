export const router = {
    GET: {
        '/': (req, res) => res.end(JSON.stringify({ "msg": "hello world" }))
    },
    POST: {
        '/': (req, res) => {
            res.writeHead(201, "Succcess");
            res.end(JSON.stringify(req.body))
        }
    }
}