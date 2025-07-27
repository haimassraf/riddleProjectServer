import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getPlayerByNameDal } from '../DAL/playerDAL.js';

export async function login(req, res) {
    try {
        res.clearCookie("token");
        const { name, password } = req.body;
        if (!name || !password) return res.status(403).send("Enter userName and password");
        const user = await getPlayerByNameDal(name);
        if (!user) return res.status(403).send("Wrong userName or password");
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) return res.status(403).send("Wrong userName or password");
        const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET_KEY, { expiresIn: '5m' });
        res.cookie("token", token, { httpOnly: true, sameSite: true });
        res.json({ user, token });
    }
    catch (err) { res.status(500).send("Error: " + err.message) };
}