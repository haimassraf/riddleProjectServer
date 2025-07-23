import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getPlayerByNameDal, getPlayerByIdDal } from '../DAL/playerDAL.js';


export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.split(" ")[1];
            const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const user = await getPlayerByIdDal(payload.id);
            req.user = user;
            next();
        } else {
            if (!req.body) return res.status(403).send("You need to login first")
            const { name, password } = req.body;
            if (!name || !password) return res.status(403).send("Enter userName and password");
            const user = await getPlayerByNameDal(name);
            if (!user) return res.status(403).send("Wrong userName or password");
            const matchPassword = await bcrypt.compare(password, user.password);
            if (!matchPassword) return res.status(403).send("Wrong userName or password");
            const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET_KEY, { expiresIn: '5m' });
            req.user = user;
            return res.json({ user, token });
        }
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            res.clearCookie("token");
            res.status(401).send("Auto Logout. Please login again.");
        } else { res.status(500).send("Error: " + err.message) }
    };
};