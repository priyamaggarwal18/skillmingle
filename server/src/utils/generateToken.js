import jwt from "jsonwebtoken";
import env from "../db/ValidateEnv.js";

const generateToken = (user) => {
    return jwt.sign(
        { _id: user._id, role: user.role },
        env.JWT_SECRET,
        { expiresIn: '24h' } // Increased expiry time since we're using single token
    );
};

export default generateToken;