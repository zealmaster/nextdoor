import { connect } from "@/app/dbconfig/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/model/userModel";
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { username, password, latitude, longitude } = data;

        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return NextResponse.json({ message: "Username is wrong" });
        }
        const passwordCheck = await bcrypt.compare(password, existingUser.password);

        if (latitude === existingUser.latitude && longitude === existingUser.longitude) {
            return NextResponse.json({ message: "You are at home" });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error occurred while logging in" });
    }
}

connect();
