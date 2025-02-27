import TicketTable from "@/components/TicketTable";
import getEventById from "@/lib/prisma";

export default async function EventPage({ params }: { params: { eventId: string } }) {
    const event = await getEventById(params.eventId);

    return (
        <div>
            <h1>{event.name}</h1>
            <p>{event.description}</p>
            <TicketTable tickets={event.tickets} />
        </div>
    );
}