import mongoose, { Schema } from 'mongoose';

const resourceSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            lowercase: true,
            enum: {
                values: ['image', 'pdf', 'video', 'link'],
                message: '{VALUE} Type is not supported.',
            },
        },
        url: {
            type: String,
            required: true, // Cloudinary URL || USER'S URL
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Resource = mongoose.model('Resource', resourceSchema);
export default Resource;