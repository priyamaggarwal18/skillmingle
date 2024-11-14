import Project from "../models/project.model.js";
import User from "../models/user.model.js";

const getAllAdmins = async (req, res) => {
    try {
        if (req.user.role !== 'super-admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        const admins = await User.find({ role: 'super-admin' });
        if(!admins) return res.status(404).json({ message: 'No admins found' });

        return res.status(200).json(admins);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

const getAdminById = async (req, res) => {
    try {
        if(req.user.role !== 'super-admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const admin = await User.find({ _id: req.params.id, role: 'super-admin' });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        return res.status(200).json(admin);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const countUsers = async (req, res) => {
    try {
        if (req.user.role !== 'super-admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        const usersLen = await User.countDocuments();
        if (!usersLen)
            return res
                .status(404)
                .json({ message: 'No users found' });

        return res.status(200).json({ total: usersLen });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const countProjects = async (req, res) => {
    try {
        if (req.user.role !== 'super-admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        const projectsLen = await Project.countDocuments();
        if (!projectsLen)
            return res
                .status(404)
                .json({ message: 'No projects found' });

        return res.status(200).json({ total: projectsLen });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export default {
    getAllAdmins,
    getAdminById,
    countUsers,
    countProjects,
};