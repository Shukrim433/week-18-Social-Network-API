// /api/users
// get route - to get all users:
// get route - to get a single user by their id and populate thought and friend data
// post route - to create a new user
// put route - to update a user by their id
// delete route - to delete a user by their id and delete associated thoughts (not friends tho)
// /api/users/:userId/friends/:friendId
// post route - to add another user to this user's friends array
// delete route - to remove a user from this user's friends array

const { User, Thought } = require('../models');

module.exports = {

    // get all users
    async getUsers(req, res) {
        try {
            const userData = await User.find()
            res.status(200).json(userData)
        } catch(err){
            return res.status(500).json(err)
        }
    },


    // get one user by id + their associated thoughts + friends
    async getSingleUser(req, res) {
        try {
            const userData = await User.findOne({_id: req.params.userId})
            .populate({path: 'thoughts', select: '-__v'})  // ie include all associated thoughts
            .populate({path: 'friends', select: '-__v'})  // ie include all associated friends

            if(!userData) {
                return res.status(404).json({message: 'no user with this _id found'})
            }
            
            res.status(200).json(userData)
        } catch(err){
            return res.status(500).json(err)
        }
    },


    // create a user
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body)
            res.status(200).json(userData)
        } catch(err) {
            return res.status(500).json(err)
        }
    },


    // update a user
    async updateUser(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                {_id : req.params.userId},
                {$set: {username: req.body.username, email: req.body.email}},
                {runValidators: true, new: true}
            )

            if(!userData) {
                return res.status(404).json({message: 'no user with this _id found'})
            }

            res.status(200).json(userData)
        } catch(err) {
            return res.status(500).json(err)
        }
    },



    // delete a user + their associated thoughts
    async deleteUser(req, res) {
        try {
            const userData = await User.findOneAndDelete({_id: req.params.userId})

            if(!userData) {
                return res.status(404).json({message: 'no user with this _id found'})
            }

            await Thought.deleteMany( { _id: {$in: userData.thoughts} } )  //***

            res.status(200).json({message: 'user and associated thoughts deleted'})

        } catch (err) {
            return res.status(500).json(err)
        }
    }, 


    // add a user to another user's friends list
    async addFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: {_id: req.params.friendId}} },  // (if it doesnt already exist) adds a single user's id to this user's friends array 
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


    // delete a user from another user's friends list
    async deleteFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: { _id: req.params.friendId } } },  // removes the friend's _id from the user's friends array
                { runValidators: true, new: true }
            )

            if(!userData) {
                return res.status(404).json({message: 'no user with this _id found'})
            }

            res.status(200).json(userData)
        } catch(err) {
            return res.status(500).json(err)
        }
    }

}


// $in  -  is an operator that is used to check if the value of a specified field is within a specified array
// e.g.  Thought.deleteMany( { _id: {$in: userData.thoughts} } )
// looking for all docs in the Thought model who's _id field is in the 'thoughts' array on the User model -  then deletes them