import { auth } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export default auth((req) => {
    const {pathname} = new URL(req.url);

    const publicRoutes = [
        "/",
        "/login",
        "/signup",
    ]
    return NextResponse.next()
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|/|signup|about).*)"]};