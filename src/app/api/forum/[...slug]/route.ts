import { connect } from "@/app/dbconfig/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Forum from "@/app/model/forumModel";

connect();

export async function GET(req: NextRequest, { params }: { params: { slug: string }}) {
    const slug = params.slug 
    const latitude = Number(slug[0])
    const longitude = Number(slug[1])
    let data = []
    try {
      const fetchData = await Forum.find(  ).sort({ created_at: -1 });
      for(let i in fetchData) {
      const distance = calculateDistance(latitude, longitude, Number(fetchData[i].latitude), Number(fetchData[i].longitude));
      console.log(distance)
        if (!Number.isNaN(distance) && Number(distance) < 1000) {
          data.push(fetchData[i])}
    }
      if (!fetchData || fetchData.length === 0) {
        return NextResponse.json({ message: "No posts found" });
      }
      return NextResponse.json({ data,  message: 'Fetched posts successfully' });
    } catch (error: any) {
      console.log(error);
      return NextResponse.json({ error, message: "An error occurred fetching posts" });
    }
  
  }

  const calculateDistance = (lat1: number, lat2: number, lon1: number, lon2: number): Number => {
    const R = 6371;
    const dLat = degToRad(lat2 - lat1)
    const dLon = degToRad(lon2 - lon1)

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance : Number = R * c;
    return distance.toFixed(2);
  }

  const degToRad = (deg: number) => {
    return deg *( Math.PI)/180
  }