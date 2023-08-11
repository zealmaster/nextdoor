import { connect } from "@/app/dbconfig/mongodb";
import { NextRequest, NextResponse } from "next/server";
import * as dotenv from 'dotenv'
dotenv.config()

connect();

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('token')?.value || ""
        req.cookies.delete(token);        
        const response = NextResponse.json({message: "Logout successfully"})
        response.cookies.set('token', '', {httpOnly: true})
        return response
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error occurred while logging out" });
    } 
}

