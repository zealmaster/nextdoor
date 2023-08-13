import { connect } from "@/app/dbconfig/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/model/userModel";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

connect();

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { username, password, latitude, longitude } = data;
        const existingUser = await User.findOne({ username: username });
        if (!existingUser) {
            return NextResponse.json({ message: "Username is wrong" });
        }
        const passwordCheck = await bcrypt.compare(password, existingUser.password);
        if (!passwordCheck) {
            return NextResponse.json({ message: "Password is wrong" });
        }
        if (latitude === 0 && longitude === 0) {
            return NextResponse.json({ message: "Please turned on your device location" });
        }
        // Create token data
        const tokenData = {
            id: existingUser._id,
            username: existingUser.username,
            latitude: existingUser.latitude,
            longitude: existingUser.longitude
        }
        // create token
        const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: '150d' })
        const response = NextResponse.json({ message: "You are at home", success: true});
        response.cookies.set('token', token, {httpOnly: true})
        return response
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error, message: "An error occurred while logging in" });
    }
}
