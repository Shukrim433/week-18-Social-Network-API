const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction'); // import the reaction schema to set the schema for the subdocs of the reactions array

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {      // getter function formats the date to a simple YYYY-MM-DD string.
                if (date) return date.toISOString().split("T") [0];
              }
        },
        username: {    // the user that created this thought
            type: String,
            required: true,
        },
        reactions: [
            reactionSchema
        ]
    },
    {
        toJSON: {
            getters: true,   // ensures getters are applied when converting to JSON
            virtuals: true,  
        },
        id: false,  
    }
)

// virtual that returns the number of rections on a thought
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})

// create a model called thought that uses the thoughSchema
const Thought = model('thought', thoughtSchema)

// modularise and export this model
module.exports = Thought



// ** In Mongoose, a getter is a function defined in a schema that transforms a value when it is accessed. Getters are useful for formatting or manipulating data before it is returned to the application. 