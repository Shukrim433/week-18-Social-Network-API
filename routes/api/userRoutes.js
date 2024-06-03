const router = require('express').Router();
const {getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, removeFriend} = require('../../controllers/userControllers')


// /api/users/
router.route('/').get(getUsers).post(createUser)


// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser)


// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend)


module.exports = router






// /api/users
// get route - to get all users:
// get route - to get a single user by their id and populate thought and friend data
// post route - to create a new user
// put route - to update a user by their id
// delete route - to delete a user by their id and delete associated thoughts (not friends tho)
// /api/users/:userId/friends/:friendId
// post route - to add another user to this user's friends array
// delete route - to remove a user from this user's friends array