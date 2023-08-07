import mongoose  from 'mongoose';
import { connect } from '../dbconfig/mongodb';


connect()

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        default: false,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    },
    longitude: {
        type: Number,
        default: null,
      },
    latitude: {
        type: Number,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.models.users || mongoose.model('users', userSchema)
  
export default User;
