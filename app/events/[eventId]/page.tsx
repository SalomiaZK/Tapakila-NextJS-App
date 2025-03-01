"use client";

import { getEventById } from "@/app/actions";
import TicketTable from "@/components/TicketTable";
import { useEffect, useState } from "react";

export default function EventPage({ params }: { params: { eventId: string } }) {
    const [event, setEvent] = useState<any>(null);

    useEffect(() => {
        async function fetchEvent() {
            const eventData = await getEventById(params.eventId);
            setEvent(eventData);
        }
        fetchEvent();
    }, [params.eventId]);

    if (!event) {
        return <div className="text-center text-bleuNuit mt-8">Événement non trouvé</div>;
    }

    return (
        <div className="bg-blancCasse min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-bleuNuit mb-6">{event.event_name}</h1>
                <p className="text-lg text-gray-700 mb-8">{event.event_description}</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-bleuNuit mb-2">Date et Heure</h2>
                            <p className="text-gray-600">
                                {new Date(event.event_date).toLocaleDateString()} -{" "}
                                {new Date(event.event_date).toLocaleTimeString()}
                            </p>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-bleuNuit mb-2">Lieu</h2>
                            <p className="text-gray-600">{event.event_place}</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-bleuNuit mb-6">Billets Disponibles</h2>
                        <TicketTable tickets={event.tickets.map((ticket: any) => ({
                            id: ticket.ticket_id,
                            type: ticket.ticket_type,
                            price: ticket.ticket_price,
                            quantity: ticket.ticket_available_number,
                            limitPerUser: Number(ticket.ticket_status),
                        }))} />
                    </div>
                </div>
            </div>
        </div>
    );
}