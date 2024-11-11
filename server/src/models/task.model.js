import mongoose, { Schema } from "mongoose";

const TaskSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Task Name is Required'],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: ['done', 'in-progress', "todo"],
            default: 'active',
        },
        tags: [
            {
                type: String,
                trim: true,
            }
        ],
        developer: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
        project: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
            required: true,
        },
        resources: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Resource',
            }
        ],
        startDate: {
            type: Date,
            default: Date.now,
        },
        endDate: {
            type: Date,
            required: true, // handled manually as last date of project
        },
    }, {
        timestamps: true,
    }
);

const Task = mongoose.model('Task', TaskSchema);
export default Task;