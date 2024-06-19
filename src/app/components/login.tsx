import { NextRequest } from "next/server";

export function isLoggedIn(req: NextRequest) {
    const token = req.cookies.get('token')?.value || '';
    if (token) return true;
}