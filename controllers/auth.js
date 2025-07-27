import jwt from 'jsonwebtoken';
import { getPlayerByIdDal, getPlayerByNameDal, createPlayerDal } from '../DB/playerDB.js';
import bcrypt from 'bcrypt';


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
                return res.status(403).send("You need to login first");
            }
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                res.clearCookie("token");
                res.status(401).send("Auto Logout. Please login again.");
            } else { res.status(500).send("Error: " + err.message) }
        };
    };
};


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


export async function logout(req, res) {
    res.clearCookie("token");
    res.send("Logout succesfully");
}


export async function signup(req, res) {
    try {
        res.clearCookie("token");
        const { name, password } = req.body;
        if (!name || !password) return res.status(403).send("Enter userName and password");
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = { name: name, password: hashPassword };
        const insertedUser = await createPlayerDal(newUser);
        const token = jwt.sign({ id: insertedUser.id }, process.env.JWT_SECRET_KEY, { expiresIn: '5m' });
        res.cookie("token", token, { httpOnly: true, sameSite: true });
        res.send({ insertedUser, token });
    } catch (err) { res.status(500).send("Error: " + err.message) };
}