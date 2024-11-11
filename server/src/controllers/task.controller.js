import Task from '../models/task.model.js';
import Project from '../models/project.model.js';

const createTask = async (req, res) => {
    try {
        const { name, description, status, tags, developer, project, resources, startDate, endDate } = req.body;
        const { id: userId } = req.user;

        // Check if project exists
        const projectExists = await Project.findById(project);
        if (!projectExists) {
            return res.status(404).json({
                success: false,
                message: 'Project not found',
                data: null
            });
        }

        // Create new task
        const task = new Task({
            name,
            description,
            status,
            tags,
            developer,
            project: projectExists._id,
            resources,
            startDate,
            endDate
        });

        // Associate task with project
        projectExists.tasks.push(task._id);
        await projectExists.save();

        await task.save();

        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const getTasks = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const tasks = await Task.find({
            $or: [
                { developer: userId },
                { project: { $in: req.user.projects } }
            ]
        }).populate('developer project resources');

        res.status(200).json({
            success: true,
            message: 'Tasks fetched successfully',
            data: tasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, status, tags, developer, resources, startDate, endDate } = req.body;

        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found',
                data: null
            });
        }

        task.name = name || task.name;
        task.description = description || task.description;
        task.status = status || task.status;
        task.tags = tags || task.tags;
        task.developer = developer || task.developer;
        task.resources = resources || task.resources;
        task.startDate = startDate || task.startDate;
        task.endDate = endDate || task.endDate;

        await task.save();

        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found',
                data: null
            });
        }

        // Remove task from project
        const project = await Project.findById(task.project);
        project.tasks.pull(task._id);
        await project.save();

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

export default {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};