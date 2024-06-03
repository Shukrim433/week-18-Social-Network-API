// /api/thoughts
// get route - to get all thoughts
// get route - to get a single thought by id
// post route - to create a new thought and add the new thought's _id to the associated user's thoughts array
// put route - to update a thought by its _id
// delete route - to delete a route by its _id

// /api/thoughts/:thoughtId/reactions
// post route - to add a reaction (from post req.body) and store add it to the 'reactions' array of a thought
// delete route - to remove a reaction from a thought's 'reactions' array by the reactionId

const { Thought, User } = require('../models')

module.exports = {

    // get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughtData = await Thought.find()
            res.status(200).json(thoughtData)
        } catch(err) {
            return res.status(500).json(err)
        }
    },


    // get one thought
    async getSingleThought(req, res) {
        try {
            const thoughtData = await Thought.findOne({_id : req.params.thoughtId})

            if(!thoughtData) {
                return res.status(404).json({message: 'no thought with this _id found'})
            }

            res.status(200).json(thoughtData)
        } catch(err) {
            return res.status(500).json(err)
        }
    }, 


    // create a thought + add it to a user's thoughts list
    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body)

            if(!thoughtData) {
                return res.status(400).json({message: 'error in creating thought'})
            }

            const userData = await User.findOneAndUpdate(
                { username: req.body.username },
                { $addToSet: { thoughts: thoughtData._id } },
                { runValidators: true, new: true }
        )

        if(!userData) {
            return res.status(404).json({message: 'no user with this _id found'})
        }

        res.status(200).json(userData)
        } catch(err) {
            return res.status(500).json(err)
        }
    },


    // update a thought
    async updateThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true}
            )

            if(!thoughtData){
                return res.status(404).json({message: 'no thought with this _id found'})
            }

            res.status(200).json(thoughtData)
        } catch(err) {
            return res.status(500).json(err)
        }
    }, 


    // delete a thought
    async deleteThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndDelete({_id: req.params.thoughtId})

            if(!thoughtData) {
                return res.status(404).json({message: 'no thought with this _id found'})
            }

            res.status(200).json({message: 'thought deleted successfully!'})
        } catch(err) {
            return res.status(500).json(err)
        }
    },


    // add a reaction  to a thought's 'reactions' list
    async addReaction(req, res) {
        try {
            const thoughtData  = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: {reactions: req.body} },
                { runValidators: true, new: true }
            )

            if(!thoughtData) {
                return res.status(404).json({message: 'no thought with this _id found'})
            }

            res.status(200).json(thoughtData)
        } catch(err) {
            return res.status(500).json(err)
        }
    },


    // remove a reaction from a thought's 'reactions' list
    async removeReaction(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: {reactions: {reactionId: req.params.reactionId}} },
                {runValidators: true, new: true}
            )

            if(!thoughtData) {
                return res.status(404).json({message: 'no thought with this _id found'})
            }

            res.status(200).json(thoughtData)
        } catch(err) {
            return res.status(500).json(err)
        }
    }
}