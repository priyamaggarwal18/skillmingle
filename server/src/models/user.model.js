import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['developer', 'manager', 'admin'],
        default: 'developer',
    },
    refreshToken: {
        type: String
    }
}, {
    timestamps: true,
});

userSchema.methods.checkPassword = () => {
    if (this.isModified(this.password)) {
        this.password = bcrypt.hash(this.password, 10);
    }
};

const User = mongoose.model('User', userSchema);
export default User;