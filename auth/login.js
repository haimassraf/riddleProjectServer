export async function login(req, res) {
    try { res.send(req.user); }
    catch (err) { res.status(500).send("Error: " + err.message) };
}