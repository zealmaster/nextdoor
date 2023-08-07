import { connect } from "@/app/dbconfig/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/model/userModel";
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { username, password, repeatPassword, latitude, longitude } = data;
        if (password !== repeatPassword) {
            return NextResponse.json({ message: "Passwords do not match" });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return NextResponse.json({ message: "Username already exist" });
        }

        const newUser = new User({
            username,
            password: passwordHash,
            latitude,
            longitude
        });

        const user = await newUser.save();
        return NextResponse.json({ user, message: "Sign up is successful" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error occurred while signing up" });
    }
}

connect();
