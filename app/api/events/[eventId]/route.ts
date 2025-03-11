/**import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { eventId } = req.query;

    if (req.method === 'GET') {
        try {
            const event = await prisma.event.findUnique({
                where: { event_id: eventId as string },
                include: { tickets: true }
            });

            if (event) {
                res.status(200).json(event);
            } else {
                res.status(404).json({ error: 'Event not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch event' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}*/

import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    console.log(request);
    try {
        const { id } = await params
        const body = await request.json()

        const event = await prisma.event.findUnique({
            where: {
                event_id: id
            }
        })

        if (event != null) {
            const updateEv = await prisma.event.update({
                where: {
                    event_id: id,
                },
                data: body
            })

            return new Response(JSON.stringify(updateEv), { status: 200 })

        }
        else {
            const createEv = await prisma.event.create({
                data: body
            })

            return new Response(JSON.stringify(createEv), {
                status: 201
            })
        }
    } catch (error) {
        console.error("Error while creating the event", error)
        return new Response(JSON.stringify({ error: "Repository erro" }),
            { status: 500 }
        )
    }

    finally {
        await prisma.$disconnect()
    }
}

// mande 
export async function GET(request: Request, { params }: { params: { id: string } }) {


    const { id } = params
    try {
        const event = await prisma.event.findUnique({
            where: {
                event_id: id
            }
        })


        return new Response(JSON.stringify(event), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }
    catch (error) {
        console.error("error fetching datas", error)
        return new Response(JSON.stringify({ error: "Repository Error" }), { status: 500 })

    }
    finally {
        prisma.$disconnect()
    }
}


export async function DELETE(params: string) {
    try {
        const event = await prisma.event.delete({
            where: {
                event_id: params
            }
        })

        const verify = await prisma.event.findUnique({
            where: {
                event_id: params
            }
        })

        if (verify == null) {
            return Response.json(
                { error: "that event doesn't exist" },
                { status: 500 }
            )
        } else {
            return new Response(JSON.stringify(event), { status: 200, headers: { 'Content-Type': 'application/json' } })
        }

    }
    catch (error) {
        console.error("error fetching datas", error)
        return new Response(JSON.stringify({ error: "Repository Error" }), { status: 500 })

    }
    finally {
        prisma.$disconnect()
    }
}
