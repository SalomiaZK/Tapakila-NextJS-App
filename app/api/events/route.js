import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();


export async function GET() {
    const events = await prisma.event.findMany({
        include: {
            attendees: true,
            location: true
        }
    });
    return new Response(JSON.stringify(events), {status:200, headers: {'Content-Type': 'application/json'}});
}