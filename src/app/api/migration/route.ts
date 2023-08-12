import { connect } from "../../dbconfig/mongodb";
import Forum from "../../model/forumModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function  POST(req: NextRequest) {
    try {
        await Forum.updateMany(
            {},
            {$set: {likes: 0, dislikes: 0}}
        );
        return NextResponse.json({message: 'Migration successful'})
    } catch (error) {
        console.log(error)
    }
}