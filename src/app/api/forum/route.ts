import { connect } from "@/app/dbconfig/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Forum from "@/app/model/forumModel";
import Jwt  from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config()

connect();

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { message, latitude, longitude } = data;

        const token = req.cookies.get('token')?.value || ""
        const decoded: any = Jwt.verify(token, process.env.JWT_SECRET!)
        const username= decoded.username

        const postData = new Forum( {
            username,
            message,
            latitude,
            longitude,
            comments: []
        })
        const post = await postData.save()
        return NextResponse.json({post, message: "Post sent successfully"})
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error occurred while sending post" });
    }
}

export async function GET(req: NextRequest) {      
        try {
        const data = await Forum.find().sort({ created_at: -1 });
          if (!data || data.length === 0) {
            return NextResponse.json({ message: "No posts found" });
          }
          return NextResponse.json({ data, message: 'Fetched posts successfully' });
        } catch (error: any) {
          console.log(error);
          return NextResponse.json({ error, message: "An error occurred fetching posts" });
        }

}



