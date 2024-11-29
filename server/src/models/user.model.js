import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters']
    },
    role: {
        type: String,
        required: true,
        enum: {
            values: ['developer', 'project-manager', 'moderator', 'super-admin'],
            message: '{VALUE} is not supported'
        },
        default: 'developer'
    },
    avatar: {
        type: String,
        default: null
    },
    refreshToken: {
        type: String
    },
    badges: [{
        type: String,
        name: String,
        earnedAt: Date
    }],
    skills: [{
        type: String
    }],
    preferredWorkingHours: {
        start: Date,
        end: Date
    },
    notifications: {
        email: {
            type: Boolean,
            default: true
        },
        push: {
            type: Boolean,
            default: true
        }
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'busy'],
        default: 'active'
    },
    socketId: {
        type: String
    },
    lastActive: {
        type: Date
    },
    authApps: [{
        username: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        },
    }]
}, {
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
};

userSchema.methods.getPublicProfile = function() {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.refreshToken;
    return userObject;
};

const User = mongoose.model('User', userSchema);
export default User;