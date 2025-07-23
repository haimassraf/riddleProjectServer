export async function logout(req, res) {
    res.clearCookie("token");
    res.send("Logout succesfully");
}