export async function logout(req, res) {
    if (req.cookies.token) {
        res.clearCookie("token");
        res.send("Logout succesfully");
    }
    else { res.status(401).send("You Already Logout"); }
}