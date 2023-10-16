const mongoose = require('mongoose');
const { User, Thought } = require('../models');

mongoose.connect('mongodb://127.0.0.1:27017/social-network-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSeeds = [
    {
        username: 'JohnDoe',
        email: 'johndoe@example.com',
    },
    {
        username: 'JaneDoe',
        email: 'janedoe@example.com',
    }
];

const seedDatabase = async () => {
    try {
        await User.deleteMany({});
        await Thought.deleteMany({});

        // Create users
        await User.create(userSeeds);

        const thoughtSeeds = [
            {
                thoughtText: "This is John's first thought!",
                username: 'JohnDoe'
            },
            {
                thoughtText: "This is Jane's first thought!",
                username: 'JaneDoe',
                reactions: [
                    {
                        reactionBody: "I agree with Jane!",
                        username: "JohnDoe"
                    }
                ]  // Embed the reaction directly
            }
        ];

        // Create thoughts
        await Thought.create(thoughtSeeds);

        console.log('Database seeded!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDatabase();
