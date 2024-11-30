import axios from 'axios';
import User from '../models/user.model.js';
import generateToken from "../utils/generateToken.js";

const register = async (req, res) => {
    try {
        const { email, password, fullName, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered',
                data: null
            });
        }

        // Create new user
        const user = new User({
            email,
            password,
            fullName,
            role
        });
        await user.save();

        const token = generateToken(user);

        // Remove sensitive data
        const userProfile = user.getPublicProfile();

        res
            .cookie('token', token, {
                httpOnly: true,
                sameSite: 'strict'
            })
            .status(201)
            .json({
            success: true,
            message: 'User registered successfully',
            data: {
                user: userProfile,
                token
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(email, password);

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                data: null
            });
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
                data: null
            });
        }

        // Generate token
        const token = generateToken(user);

        // Update last active
        user.lastActive = new Date();
        user.status = 'active';

        await user.save();

        return res.cookie('token', token, {
                httpOnly: true,
                sameSite: 'strict',
            })
            .status(200)
            .json({
                success: true,
                message: 'Login successful',
                data: {
                    user: user.getPublicProfile(),
                    token,
                },
            });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

const logout = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                data: null
            });
        }

        user.status = 'inactive';
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Logged out successfully',
            data: null
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const getProfile = async (req, res) => {
    try {
        // console.log(req.user);

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                data: null
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Profile retrieved successfully',
            data: user?.getPublicProfile()
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const allowedUpdates = ['fullName', 'avatar', 'skills', 'preferredWorkingHours', 'notifications'];
        const updates = Object.keys(req.body);
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).json({
                success: false,
                message: 'Invalid updates',
                data: null
            });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                data: null
            });
        }

        updates.forEach(update => user[update] = req.body[update]);
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: user.getPublicProfile()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                data: null
            });
        }

        user.status = status;
        user.lastActive = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Status updated successfully',
            data: user.getPublicProfile()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const githubLogin = async (req, res) => {
    try {
        const { code } = req.body;
        const response = await axios.post(`${GITHUB_URL}/login/oauth/access_token`, {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
        });

        const accessToken = response.data.access_token;
        const userResponse = await axios.get(`${GITHUB_URL}/user`, {
            headers: {
                Authorization: `token ${accessToken}`,
            },
        });

        const githubUser = userResponse.data;
        const user = await User.findOneAndUpdate({ email: githubUser.email }, {
            email: githubUser.email,
            fullName: githubUser.name,
            avatar: githubUser.avatar_url,
            tokens: (this?.tokens || []).concat({
                service: 'github',
                token: accessToken
            }),
            role: 'user',
        }, {
            new: true,
            upsert: true,
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Failed to login',
                data: null
            });
        }

        return res
            .cookie('token', generateToken(user), {
                httpOnly: true,
                sameSite: 'strict',
            })
            .status(200)
            .json({
                success: true,
                message: 'Login successful',
                data: {
                    user: user.getPublicProfile(),
                }
            });
    } catch (error) {
        console.error('Github login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};



export default {
    register,
    login,
    logout,
    getProfile,
    updateProfile,
    updateStatus,
    githubLogin,
};