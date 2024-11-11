    import mongoose, { Schema } from "mongoose";
    import getFutureDate from "../utils/date.js";

    const projSchema = new Schema(
        {
            title: {
                type: String,
                required: [true, 'Title is Required'],
                trim: true,
                unique: true,
                minlength: 3,
            },
            description: {
                type: String,
                trim: true,
                minlength: 10,
            },
            status: {
                type: String,
                lowercase: true,
                enum: {
                    values: ['active', 'inactive'],
                    message: "{VALUE} is not supported",
                },
                default: 'active',
            },
            owner: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            team: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
            ],
            tasks: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Task',
                },
            ],
            resources: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Resource',
                },
            ],
            startDate: {
                type: Date,
                default: Date.now,
            },
            endDate: {
                type: Date,
                default: () => getFutureDate(1), // 1 month from now
            },
        },
        {
            timestamps: true,
        }
    );

    const Project = mongoose.model('Project', projSchema);
    export default Project;