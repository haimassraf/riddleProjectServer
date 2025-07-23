import bcrypt from 'bcrypt'
import { createPlayerDal } from '../DAL/playerDAL.js'
import jwt from 'jsonwebtoken'

export async function signup(req, res) {
    try {
        res.clearCookie("token");
        const { name, password } = req.body;
        if (!name || !password) return res.status(403).send("Enter userName and password");
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = { name: name, password: hashPassword };
        const insertedUser = await createPlayerDal(newUser);
        const token = jwt.sign({ id: insertedUser[0].id }, process.env.JWT_SECRET_KEY, { expiresIn: '5m' });
        res.cookie("token", token, { httpOnly: true, sameSite: true });
        res.send(insertedUser);
    } catch (err) { res.status(500).send("Error: " + err.message) };
}