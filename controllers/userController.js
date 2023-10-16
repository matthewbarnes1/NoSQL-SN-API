const { User, Thought } = require('../models');

const userController = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find().populate('thoughts').populate('friends');
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: 'Failed to fetch all users', error: err.message });
        }
    },

    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json({ message: 'Failed to fetch user by ID', error: err.message });
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json({ message: 'Failed to create user', error: err.message });
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json({ message: 'Failed to update user', error: err.message });
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            // Deleting a user's associated thoughts
            await Thought.deleteMany({ username: user.username });
            res.json({ message: 'User and associated thoughts deleted!' });
        } catch (err) {
            res.status(500).json({ message: 'Failed to delete user', error: err.message });
        }
    },

    async addFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json({ message: 'Failed to add friend', error: err.message });
        }
    },

    async removeFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json({ message: 'Failed to remove friend', error: err.message });
        }
    }
};

module.exports = userController;
