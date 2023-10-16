const express = require('express');
const connection = require('./config/connection');
const routes = require('./routes');

// const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

connection.on('error', (error) => {
  console.error('Error connecting to the database:', error);
});

connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API Server functional, running on port ${PORT}!`);
  });
});
