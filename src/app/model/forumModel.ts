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
    location: {
        type: { type: String, enum: ['Point'], required: true},
        coordinates: { type: [Number], required: true}
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
    
    likes: {
                type: Number,
                default: 0
            },

    dislikes:  {
                type: Number,
                default: 0
        },
    
    likedBy: [{
        type: String,
    }],

    disLikedBy: [{
                type: String,
            }]
    
})
forumSchema.index({ location: '2dsphere' });
const Forum = mongoose.models.forums || mongoose.model('forums', forumSchema)

export default Forum;