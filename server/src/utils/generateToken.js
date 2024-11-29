import jwt from "jsonwebtoken";
import env from "../config/ValidateEnv.js";

const generateToken = (user) => {
    return jwt.sign(
        { _id: user._id, role: user.role },
        env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

export default generateToken;