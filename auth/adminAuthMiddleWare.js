import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getPlayerByNameDal } from '../DAL/playerDAL.js';


export const adminAuthMiddleware = async (req, res, next) => {
    try {
        if (req.cookies.token) {
            const payload = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
            if (payload.rol !== 'admin') return res.status(403).send("You arent admin")
            req.user = { id: payload.id };
            next();
        } else {
            if (!req.body) return res.status(403).send("You need to login first")
            const { name, password } = req.body;
            if (!name || !password) return res.status(403).send("Enter userName and password");
            const user = await getPlayerByNameDal(name);
            if (user.length === 0) return res.status(403).send("Wrong userName or password");
            const matchPassword = await bcrypt.compare(password, user[0].password);
            if (!matchPassword) return res.status(403).send("Wrong userName or password");
            if (user[0].rol !== 'admin') return res.status(403).send("You arent admin");
            const token = jwt.sign({ id: user[0].id, rol: user[0].rol }, process.env.JWT_SECRET_KEY, { expiresIn: '5m' });
            res.cookie("token", token, { httpOnly: true, sameSite: true });
            req.user = user[0];
            next();
        }
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            res.clearCookie("token");
            res.status(401).send("Auto Logout. Please login again.");
        } else { res.status(500).send("Error: " + err.message) }
    };
};