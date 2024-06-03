const router = require('express').Router()
const { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, removeReaction } = require('../../controllers/thoughtControllers')


// /api/thoughts/
router.route('/').get(getThoughts).post(createThought)


// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)


// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction)

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)


module.exports = router







// /api/thoughts
// get route - to get all thoughts
// get route - to get a single thought by id
// post route - to create a new thought and add the new thought's _id to the associated user's thoughts array
// put route - to update a thought by its _id
// delete route - to delete a route by its _id

// /api/thoughts/:thoughtId/reactions
// post route - to add a reaction (from post req.body) and store add it to the 'reactions' array of a thought
// delete route - to remove a reaction from a thought's 'reactions' array by the reactionId