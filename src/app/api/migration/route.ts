import { connect } from "../../dbconfig/mongodb";
import Forum from "../../model/forumModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function  POST(req: NextRequest) {
    try {
        const posts = await Forum.find();
        for(const post of posts) {
            let latitude = post.latitude;
            let longitude = post.longitude;
            await Forum.updateOne(
                {_id: post._id},
                {$set: {location: {type: "Point", coordinates: [longitude, latitude]}}}
            )
        }

        // await Forum.updateMany(
        //     {},
        //     {$set: {location: {type: "Point", coordinates: []}}}
        // );
        return NextResponse.json({message: 'Migration successful'})
    } catch (error) {
        console.log(error)
    }
}