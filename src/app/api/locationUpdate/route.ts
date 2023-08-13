import { connect } from "@/app/dbconfig/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/model/userModel";
import Jwt  from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config()

connect();

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { latitude, longitude } = data;
        const token = req.cookies.get('token')?.value || ""
        const decoded: any = Jwt.verify(token, process.env.JWT_SECRET!)
        const id = decoded.id
        const fetchPost = await User.findById({_id : id})

       const response = await User.updateOne(
            { _id: fetchPost._id && latitude !== 0},
            {
                $set: { latitude: latitude, longitude: longitude }
            }
          );
        return NextResponse.json({message: "Location updated successfully"})
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Please turn on your device location and refresh this page" });
    }
}


