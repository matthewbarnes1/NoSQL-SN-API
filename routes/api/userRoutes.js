const router = require('express').Router();
const {
    getAllUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser, 
    addFriend, 
    removeFriend
} = require('../../controllers/userController');

router.route('/')
    .get(getAllUsers)
    .post(createUser)
    .put(updateUser); // Note: Generally, we don't put and post on the same route without a specific ID.

router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;
