import Link from "next/link";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

interface EventCardProps {
    id: string;
    name: string;
    date: string;
    location: string;
    description: string;
    imageUrl: string;
}

export default function EventCard({
    id,
    name,
    date,
    location,
    description,
    imageUrl,
}: EventCardProps) {
    return (
        <div className="bg-blancCasse rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800">{name}</h3>
                <p className="text-gray-600 mt-2">{description}</p>
                <div className="mt-4 flex items-center text-gray-500">
                    <FaCalendarAlt className="mr-2" />
                    <span>{new Date(date).toLocaleDateString()}</span>
                </div>
                <div className="mt-2 flex items-center text-gray-500">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{location}</span>
                </div>
                <Link
                    href={`/event/${id}`}
                    className="mt-4 inline-block bg-bleuElec text-blancCasse px-4 py-2 rounded-lg hover:bg-bleuNuit hover:text-orMetallique transition-colors"
                >
                    Voir Détails
                </Link>
            </div>
        </div>
    );
}