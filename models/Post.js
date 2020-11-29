const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,  //grabing the user id from user's schema
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
    name: {  // name of user
        type: String
    },
    avatar: {
        type: String
    },
    likes: [   //likes can have many people, so creating an array of likes containing user id
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }

        }
    ],
    comments: [
        {         // each comment contains user's id, text, name and photo of user, and date
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            name: {  // name of user
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }

        }
    ],
    date: {  //date of the post itself
        type: Date,
        default: Date.now
    }
}); 

module.exports = Post = mongoose.model('post', PostSchema);