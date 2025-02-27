import EventCard from "@/components/EventCard";
import TicketTable from "@/components/TicketTable";

const tickets = [
  {
    id: "1",
    type: "VIP",
    price: 100,
    quantity: 50,
    limitPerUser: 2,
  },
  {
    id: "2",
    type: "Standard",
    price: 50,
    quantity: 200,
    limitPerUser: 4,
  },
];

const events = [
  {
    id: "1",
    name: "Concert de Rock",
    date: "2023-12-15T20:00:00",
    location: "Paris, France",
    description: "Un concert de rock avec les meilleurs groupes internationaux.",
    imageUrl: "https://via.placeholder.com/400",
  },
];

export default function Home() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {events.map((event) => (
        <EventCard key={event.id} {...event} />
      ))}
      <div className="p-6">
        <TicketTable tickets={tickets} />
      </div>
    </div>
  );
}