import jwt from "jsonwebtoken";
import env from "../db/ValidateEnv.js";

export const generateAccessToken = (user) => {
    return jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role,
    }, env.JWT_SECRET, {
        expiresIn: '1hr',
    });
};

export const generateRefreshToken = (user) => {
    return jwt.sign({
        id: user._id,
    }, env.JWT_SECRET, {
        expiresIn: '7d',
    });
}