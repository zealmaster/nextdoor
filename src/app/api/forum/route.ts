import { connect } from "@/app/dbconfig/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Forum from "@/app/model/forumModel";
import Jwt  from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config()

connect();

function location() {
    let latitude = 0
    let longitude = 0
    if (typeof window !== 'undefined' && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            console.log(latitude)
            return {latitude, longitude}
          },
          (error) => {
            console.error('Error getting geolocation:', error.message);
          }
        );
        return {latitude, longitude}
      } 
      else {
        console.error('Geolocation is not supported by this browser.');
      }
      return {latitude, longitude}
}


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

export async function GET(res: NextResponse, req: NextRequest) {
    try {
        const data = await Forum.find().sort({ created_at: -1 });
        if (!data || data.length === 0) {
          return { message: "No posts found" };
        }
        return NextResponse.json({data, message: 'fetch post successfully'});
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({error, message: "An error occurred fetching posts" });
    }   
}

