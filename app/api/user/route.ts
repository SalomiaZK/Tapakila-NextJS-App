import createBooking from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { userId, eventId, ticketType, quantity } = await request.json();
    const booking = await createBooking(userId, eventId, ticketType, quantity);
    return NextResponse.json(booking);
}