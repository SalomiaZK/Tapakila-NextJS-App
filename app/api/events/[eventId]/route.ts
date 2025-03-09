import { PrismaClient } from '@prisma/client';
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
}