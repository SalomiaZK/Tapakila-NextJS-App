"use server";

import { neon } from "@neondatabase/serverless";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getEvents() {
    const events = await prisma.event.findMany({
        include: {
            tickets: true,
        },
    });
    return events;
}

export async function getEventById(eventId: string) {
    const event = await prisma.event.findUnique({
        where: {
            event_id: eventId,
        },
        include: {
            tickets: true,
        },
    });
    return event;
}

export async function getData() {
    if (!process.env.DATABASE_URL_PSQL) {
        throw new Error("DATABASE_URL_PSQL is not defined");
    }
    const sql = neon(process.env.DATABASE_URL_PSQL);
    const data = await sql`...`;
    return data;
}