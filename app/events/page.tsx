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
    category: string;
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
                category: event.event_category || "Autres",
            }));
            setEvents(formattedEvents);
        }
        fetchEvents();
    }, []);

    const eventsByCategory = events.reduce((acc, event) => {
        if (!acc[event.category]) {
            acc[event.category] = [];
        }
        acc[event.category].push(event);
        return acc;
    }, {} as Record<string, Event[]>);

    return (
        <div
            className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative bg-cover bg-center"
            style={{
                backgroundImage: "url('/img/bgEvent.jpg')"
            }}
        >

            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            <div className="p-16">
                <h1 className="text-4xl font-bold text-bleuNuit text-center mb-8">
                    Événements
                </h1>

                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-bleuNuit mb-6">
                        Spectacles et Concerts
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {eventsByCategory["Spectacles et Concerts"]?.map((event: Event) => (
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
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-bleuNuit mb-6">
                        Cultures et Festivals
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {eventsByCategory["Cultures et Festivals"]?.map((event: Event) => (
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
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-bleuNuit mb-6">
                        Sports et Loisirs
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {eventsByCategory["Sports et Loisirs"]?.map((event: Event) => (
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
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-bleuNuit mb-6">Autres</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {eventsByCategory["Autres"]?.map((event: Event) => (
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
                </section>
            </div>
        </div>
    );
}