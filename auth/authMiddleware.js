import jwt from 'jsonwebtoken';
import { getPlayerByIdDal } from '../DAL/playerDAL.js';


export const authMiddleware = (requiredRol = null) => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith("Bearer ")) {
                const token = authHeader.split(" ")[1];
                const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
                if (requiredRol && payload.rol !== requiredRol) {
                    return res.status(403).send("You dont have permission");
                }
                const user = await getPlayerByIdDal(payload.id);
                req.user = user;
                next();
            } else {
                return res.status(403).send("You need to login first")
            }
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                res.clearCookie("token");
                res.status(401).send("Auto Logout. Please login again.");
            } else { res.status(500).send("Error: " + err.message) }
        };
    };
};