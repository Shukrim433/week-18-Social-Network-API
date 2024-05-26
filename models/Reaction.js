const { Schema, Types } = require('mongoose')  // import the Types to use for generating unique ids for each reaction subdoc

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()  // generates a unique + new object id for each reaction document ***
        },
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        username: {  // user that posted this reaction
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {
                if (date) return date.toISOString().split("T") [0];
            }
        }
    }
)


module.exports = reactionSchema
// THIS ISNT A MODEL
// This will not be a model, but rather will be used as the `reaction` field's subdocument schema in the `Thought` model.


// *** Reaction is a subdocument and for subdocuments (like those in an array), MongoDB does not automatically generate an _id unless you specify it in the schema. This is why you might need to define a default value.
// but for top-level documents (like thought and user), MongoDB will automatically assign a unique objectId (_id field)

