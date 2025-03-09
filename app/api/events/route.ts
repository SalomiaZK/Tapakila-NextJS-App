import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const events = await prisma.event.findMany({
            include: {
                tickets: true,
            },
        });

        const validStatuses = ['AVAILABLE','RESERVED', 'SOLD'];
        const validatedEvents = events.map(event => ({
            ...event,
            tickets: event.tickets.map(ticket => ({
                ...ticket,
                ticket_status: validStatuses.includes(ticket.ticket_status) ? ticket.ticket_status : 'AVAILABLE',
            })),
        }));

        return NextResponse.json(validatedEvents);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
    }
}