const router = require('express').Router();
const thoughtController = require('../controllers/thoughtController');
const userController = require('../controllers/userController');

// * User routes

router
  .route('/api/users')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/api/users/:id')
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

router
  .route('/api/users/:userId/friends/:friendId')
  .post(userController.addFriend)
  .delete(userController.removeFriend);

// * Thought routes
router
  .route('/api/thoughts')
  .get(thoughtController.getAllThoughts)
  .post(thoughtController.createThought);

router
  .route('/api/thoughts/:id')
  .get(thoughtController.getThoughtById)
  .put(thoughtController.updateThought)
  .delete(thoughtController.deleteThought);

router
  .route('/api/thoughts/:thoughtId/reactions')
  .post(thoughtController.addReaction);

router
  .route('/api/thoughts/:thoughtId/reactions/:reactionId')
  .delete(thoughtController.removeReaction);

module.exports = router;
