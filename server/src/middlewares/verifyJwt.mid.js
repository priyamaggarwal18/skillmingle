import jwt from 'jsonwebtoken';
import env from '../db/ValidateEnv.js';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

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