const router = require('express').Router();
const { userController } = require('../controllers/userController');
const { thoughtController } = require('../controllers/thoughtController');

// User routes
router
  .route('/users')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/users/:id')
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

router
  .route('/users/:userId/friends/:friendId')
  .post(userController.addFriend)
  .delete(userController.removeFriend);

// Thought routes
router
  .route('/thoughts')
  .get(thoughtController.getAllThoughts)
  .post(thoughtController.createThought);

router
  .route('/thoughts/:id')
  .get(thoughtController.getThoughtById)
  .put(thoughtController.updateThought)
  .delete(thoughtController.deleteThought);

router
  .route('/thoughts/:thoughtId/reactions')
  .post(thoughtController.addReaction);

router
  .route('/thoughts/:thoughtId/reactions/:reactionId')
  .delete(thoughtController.removeReaction);

module.exports = router;
