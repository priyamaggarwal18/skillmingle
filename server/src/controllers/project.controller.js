import Project from "../models/project.model.js";

const createProj = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const {
            title,
            description,
            status,
            team,
            resources,
            startDate,
            endDate,
            link
        } = req.body;
        const proj = await Project.create({
            title,
            description,
            status,
            team,
            startDate,
            endDate,
            resources,
            link,
            owner: req.user.id,
        });
        if (!proj) {
            res.status(400).json({ message: "Invalid Details" });
        }
        return res.status(201).json({ message: "Project Created", project: proj });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getProjById = async (req, res) => {
    try {
        const { id } = req.params;
        const proj = await Project.findById(id);
        if (!proj) {
            return res.status(404).json({ message: 'Project not found' });
        }
        return res.status(200).json(proj);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const updateProj = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            description,
            status,
            startDate,
            endDate
        } = req.body;
        const proj = await Project.findByIdAndUpdate(id, {
            title, description, status, startDate, endDate
        }, { new: true });
        if (!proj) {
            return res.status(404).json({ message: 'Project not found' });
        }

        return res.status(200).json({ message: 'Project updated', project: proj });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const deleteProj = async (req, res) => {
    try {
        const { id } = req.params;
        const proj = await Project.findByIdAndDelete(id);
        if (!proj) {
            return res.status(404).json({ message: 'Project not found' });
        }
        return res.status(200).json({ message: 'Project deleted', project: proj });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', err: error.message });
    }
}

export default {
    createProj,
    getProjById,
    updateProj,
    deleteProj,
};