import jwt from 'jsonwebtoken';
import env from '../config/ValidateEnv.js';

export default async function verifyToken (req, res, next) {
    try {
        // console.log(req.headers.cookie.split('=')[1].split(';')[0]);
        const token =
            req.headers.authorization?.split(' ')[1] ||
            req?.headers?.cookie?.split('=')[1]?.split(';')[0];

        if (!token) {
            return res.status(403).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, env.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};