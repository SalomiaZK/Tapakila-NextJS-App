"use client";

import { getEvents } from "@/app/actions";
import EventCard from "@/components/EventCard";
import { useEffect, useState } from "react";

interface Event {
    id: string;
    name: string;
    date: string;
    location: string;
    description: string;
    imageUrl: string;
}

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        async function fetchEvents() {
            const rawEvents = await getEvents();
            const formattedEvents = rawEvents.map((event: any) => ({
                id: event.event_id,
                name: event.event_name,
                date: event.event_date.toISOString(),
                location: event.event_place,
                description: event.event_description,
                imageUrl: event.event_image,
            }));
            setEvents(formattedEvents);
        }
        fetchEvents();
    }, []);

    return (
        <div className="bg-blancCasse min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-bleuNuit text-center mb-8">
                Tous les Événements
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event: Event) => (
                    <EventCard
                        key={event.id}
                        id={event.id}
                        name={event.name}
                        date={event.date}
                        location={event.location}
                        description={event.description}
                        imageUrl={event.imageUrl}
                    />
                ))}
            </div>
        </div>
    );
}