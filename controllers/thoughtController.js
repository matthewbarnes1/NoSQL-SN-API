const { User, Thought } = require('../models');

const thoughtController = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'An unexpected error occurred - getAllthoughts' });
        }
    },

    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    },

    async createThought(req, res) {
        try {
            const user = await User.findById(req.body.userId);
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            const thought = await Thought.create(req.body);
            await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } }, { new: true });
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    },

    async addReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $push: { reactions: req.body } },
                { new: true, runValidators: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            await User.findByIdAndUpdate(thought.userId, { $pull: { thoughts: thought._id } }, { new: true });
            res.json({ message: 'Thought deleted!' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    },

    async removeReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $pull: { reactions: { _id: req.params.reactionId } } },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Failed to remove reaction' });
        }
    }    
};

module.exports = thoughtController;
