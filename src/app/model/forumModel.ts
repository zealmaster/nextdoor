import mongoose  from 'mongoose';
import { connect } from '../dbconfig/mongodb';

connect()

const forumSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        default: false,
        unique: true
    },
    message: {
        type: String,
        required: [true, 'Message cannot be empty']
    },
    longitude: {
        type: Number,
        default: null,
    },
    latitude: {
        type: Number,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    comments : [
    {
        author: {
           type: String
        },
        comment: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }
    ],
    
    likes: [
        {
            like: {
                type: Number,
                default: 0
            }
        }
    ],

    dislikes: [
        {
            dislike: {
                type: Number,
                default: 0
        }
        }
    ],
})

const Forum = mongoose.models.forums || mongoose.model('forums', forumSchema)

export default Forum;