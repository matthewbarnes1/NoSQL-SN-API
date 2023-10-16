const mongoose = require('mongoose');
const { User, Thought } = require('../models');

async function seedDatabase() {
  // Connect to MongoDB
  mongoose.connect('mongodb://localhost:27017/social-network-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Clear existing data
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Create some users
  const users = await User.create([
    {
      username: 'alice123',
      email: 'alice@example.com',
    },
    {
      username: 'bob456',
      email: 'bob@example.com',
    },
  ]);

  // Create some thoughts
  const thoughts = await Thought.create([
    {
      thoughtText: 'This is a great day!',
      username: 'alice123',
    },
    {
      thoughtText: 'I love coding with Mongoose.',
      username: 'bob456',
    },
  ]);

  // Link thoughts to users
  users[0].thoughts.push(thoughts[0]._id);
  users[1].thoughts.push(thoughts[1]._id);
  await users[0].save();
  await users[1].save();

  console.log('Seed data created.');

  // Close the connection
  mongoose.connection.close();
}

seedDatabase().catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1);
});
