// src/app/api/checkLogin/route.ts

import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

export async function GET(req) {
    try {
        const token = req.cookies.get('token');
        if (!token) {
            return NextResponse.json({ loggedIn: false });
        }

        // Verify the token
        try {
            const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
            if (decoded) {
                return NextResponse.json({ loggedIn: true });
            }
        } catch (err) {
            return NextResponse.json({ loggedIn: false });
        }
    } catch (error) {
        console.error("Error checking login status:", error);
        return NextResponse.json({ loggedIn: false });
    }
}
