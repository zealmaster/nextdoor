import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

export const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
        const connection = await mongoose.connection
        
        connection.on('connected', () => {
            console.log('MongoDB connected successfully')
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err)
            process.exit()
        })

    }catch(error) {
        console.log("Something went wrong: " + error)
    }
}