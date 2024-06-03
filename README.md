# week-18-Social-Network-API

## Description
- I wanted to build an API for a social network that uses a NoSQL database (mongoDB), so that my website can handle large amounts of unstructured data.

## Process
- The first thing i did was set up my mvc folder structure.
- Then i set up the schema for my User model/collection as well as a virtual field called 'friendCount', that gives the number of friends each user has.
- Then i set up the schema for my Thought model/collection as well as a virtual field called 'reactionCount', that gives the number of reactions each thought has.
- Then i created the schema for the subdocument `reaction` field in the `Thought` model.
- Then i created some modularized functions for my User routes (my user controllers), here are all the function's purpose and their corresponding routes:
    - get route - to get all users
    - get route - to get a single user by their id and populate thought and friend data
    - post route - to create a new user
    - put route - to update a user by their id
    - delete route - to delete a user by their id and delete associated thoughts (not friends)
    - post route - to add another user to this user's friends array
    - delete route - to remove a user from this user's friends array
- Then i created some modularized functions for my Thought routes (my thought controllers), here are all the function's purpose and their corresponding routes:
    - get route - to get all thoughts
    - get route - to get a single thought by id
    - post route - to create a new thought and add the new thought's _id to the associated user's thoughts array
    - put route - to update a thought by its _id
    - delete route - to delete a route by its _id
    - post route - to add a reaction (from post req.body) and store add it to the 'reactions' array of a thought
    - delete route - to remove a reaction from a thought's 'reactions' array by the reactionId
- All these modularized functions for Thoughts and Users were then exported do they could be used in their corresponding files in the routes folder, with their corresponding API routes, ie, get, post, put, delete.


## Application

- link to the video walk through of the routes:
part 1: https://app.screencastify.com/v3/watch/2Kk7UjhS6Yv6W2Nhxb1l
part 2: https://app.screencastify.com/v3/watch/Abt8833mpkV3dtobsGyt
