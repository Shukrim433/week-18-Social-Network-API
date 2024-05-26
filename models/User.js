const { Schema, model } = require('mongoose');

// schema for the user model/collection
const userSchema = new Schema(
  {
    username: {
        type: String, 
        unique: true,
        required: [true,'User username required'],
        trim: true,   // ensures that whitespace will be trimmed from the beginning and end of the username string
    },
    email: {
        type: String,
        unique: true,
        required: [true,'User email required'],
        validate: {
            validator: function(v) {
              return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`   // props is an object that contains information about the validation error  +  props.value is the value that failed validation
        }
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'  // self reference
        }
    ]
  },
  {
    toJSON: {
      virtuals: true,  // ensures any virtual fields are included in the JSON response
    },
    id: false,  // prevents the automatic addition of the id field to the JSON output, avoiding redundancy with the _id field
  }
);


// virtual field that gives the number of friends each user has
userSchema.virtual('friendCount').get(function(){
    return this.friends.length
})

// create a model called 'user' that uses the userSchema
const User = model('user', userSchema);

module.exports = User;