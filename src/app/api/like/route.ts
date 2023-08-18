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
        const { like, postId } = data;
        const fetchPost = await Forum.findById({_id: postId})
        const likeSum = like + Number(fetchPost.likes)
        const token = req.cookies.get('token')?.value || ""
        const decoded: any = Jwt.verify(token, process.env.JWT_SECRET!)
        const username= decoded.username
        
       const response = await Forum.updateOne(
            { _id: fetchPost._id },
            {
                $set: { likes: likeSum }
            }
          );
        return NextResponse.json({message: "Comment sent successfully"})
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error occurred while posting comment" });
    }
}


