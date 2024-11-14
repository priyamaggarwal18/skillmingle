import Resource from '../models/resource.model.js';
import Project from '../models/project.model.js';
import Task from '../models/task.model.js';

const createResource = async (req, res) => {
    try {
        const { name, description, type, url, project } = req.body;

        // Create new resource
        const resource = await Resource.create({
            name,
            description,
            type,
            url,
            project,
            owner: req.user._id,
        });

        return res.status(201).json({
            success: true,
            message: 'Resource created successfully',
            data: resource
        });
    } catch (error) {
        console.error(error.message || error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

const getResources = async (req, res) => {
    try {
        const resources = await Resource.find();

        res.status(200).json({
            success: true,
            message: 'Resources fetched successfully',
            data: resources
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const updateResource = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, type, url } = req.body;

        const resource = await Resource.findById(id);
        if (!resource) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found',
                data: null
            });
        }

        resource.name = name || resource.name;
        resource.description = description || resource.description;
        resource.type = type || resource.type;
        resource.url = url || resource.url;

        await resource.save();

        return res.status(200).json({
            success: true,
            message: 'Resource updated successfully',
            data: resource
        });
    } catch (error) {
        console.error(error.message || error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

const deleteResource = async (req, res) => {
    try {
        const { id } = req.params;

        const resource = await Resource.findById(id);
        if (!resource) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found',
                data: null
            });
        }

        // Remove resource from associated projects and tasks
        await Project.updateMany(
            { resources: resource._id },
            { $pull: { resources: resource._id } }
        );
        await Task.updateMany(
            { resources: resource._id },
            { $pull: { resources: resource._id } }
        );

        await resource.deleteOne();

        return res.status(200).json({
            success: true,
            message: 'Resource deleted successfully',
            data: null,
        });
    } catch (error) {
        console.error(error.message || error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

export default {
    createResource,
    getResources,
    updateResource,
    deleteResource
};