import jwt from 'jsonwebtoken';
import env from '../db/ValidateEnv.js';
import User from '../models/user.model.js';

const verifyJWT = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];

        if (!token) {
            return res.status(403).json({ message: 'No token provided' });
        }

        const decoded = await jwt.verify(token, env.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return res
                .status(404)
                .json({ message: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default verifyJWT;