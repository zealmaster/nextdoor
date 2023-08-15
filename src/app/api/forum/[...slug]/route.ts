import { connect } from "@/app/dbconfig/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Forum from "@/app/model/forumModel";

connect();

export async function GET(req: NextRequest, { params }: { params: { slug: string }}) {
    const slug = params.slug 
    const latitude = Number(slug[0])
    const longitude = Number(slug[1])
    try {
      const data = await Forum.find({latitude: latitude, longitude: longitude }).sort({ created_at: -1 });
      if (!data || data.length === 0) {
        return NextResponse.json({ message: "No posts found" });
      }
      return NextResponse.json({ data, message: 'Fetched posts successfully' });
    } catch (error: any) {
      console.log(error);
      return NextResponse.json({ error, message: "An error occurred fetching posts" });
    }
  
  }