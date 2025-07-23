export async function login(req, res) {
    try { res.send(`Welcome ${req.user.name || "back"}!`); }
    catch (err) { res.status(500).send("Error: " + err.message) };
}