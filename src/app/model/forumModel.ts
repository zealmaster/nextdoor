import mongoose  from 'mongoose';
import { connect } from '../dbconfig/mongodb';

connect()

const forumSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: [true, 'Please provide a username'],
        default: false,
        unique: true
    },
    message: {
        type: String,
        required: [true, 'Please provide password']
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
    }
})

const Forum = mongoose.models.forums || mongoose.model('users', forumSchema)

export default Forum;