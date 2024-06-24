import { connect } from "@/app/dbconfig/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Forum from "@/app/model/forumModel";

connect();

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug
  const latitude = Number(slug[0])
  const longitude = Number(slug[1])
  let data = []
  try {
    const posts = await Forum.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          distanceField: 'dist.calculated',
          maxDistance: 1000, // 1 km in meters
          spherical: true,
        },
      },
    ]).sort({ createdAt: -1 });
    // const fetchData = await Forum.find().sort({ created_at: -1 });

    // const distance = calculateDistance(Number(posts[i].latitude), Number(posts[i].longitude), latitude, longitude);
    // if (!Number.isNaN(distance) && Number(distance) < 300) {
    for (let i in posts) {
      data.push(posts[i])
    }
    if (!posts || posts.length === 0) {
      return NextResponse.json({ message: "No posts found" });
    }
    return NextResponse.json({ data, message: 'Fetched posts successfully' });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error, message: "An error occurred fetching posts" });
  }

  }

  const calculateDistance = (lat1: number, lat2: number, lon1: number, lon2: number): Number => {
    const R = 6371;
    const dLat = degToRad(lat2 - lat1)
    const dLon = degToRad(lon2 - lon1)

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance: Number = R * c;
    return Number(distance.toFixed(2));
  }

  const degToRad = (deg: number) => {
    return deg * (Math.PI) / 180
  }