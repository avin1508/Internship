import User from '../models/user.js';


export const createUser = async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = await User.create({ username, email });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const uploadProfilePic = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const file = req.file;
        if (!file) {
            return res.status(400).send('No file uploaded');
        }

        user.profilePic = file.path;
        await user.save();

        res.status(200).send('Profile picture uploaded successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const deleteProfilePic = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        user.profilePic = null;
        await user.save();

        res.status(200).send('Profile picture deleted successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const file = req.file;
        if (!file) {
            return res.status(400).send('No file uploaded');
        }

        user.profilePic = file.path;
        await user.save();

        res.status(200).send('User profile picture updated successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getAllProfilePics = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: ['id', 'username', 'email', 'profilePic'] });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

