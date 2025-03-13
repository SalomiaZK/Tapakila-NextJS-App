import { prisma } from "@/lib/prisma";

export async function GET() {
    const events = await prisma.event.findMany(
    );
    return new Response(JSON.stringify(events), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { event_name, event_place, event_category, event_date, event_description, event_organizer, event_id, event_image, admin_id } = body
        if (!event_name || !event_place || !event_category || !event_date) {
            return new Response(JSON.stringify({ error: 'those field must be filled! ' }))
        }
        else {
            const newEv = await prisma.event.create({
                data: {
                    event_name,
                    event_place,
                    event_category,
                    event_date,
                    event_description,
                    event_image,
                    event_organizer,
                    event_id,
                    admin_id
                }

            })

            return new Response(JSON.stringify(newEv), {
                status: 201
            })
        }
    }
    catch (error) {
        console.error("Error while creating the event", error)
        return new Response(JSON.stringify({ error: "Repository erro" }),
            { status: 500 }
        )
    }

    finally {
        await prisma.$disconnect()
    }
}
