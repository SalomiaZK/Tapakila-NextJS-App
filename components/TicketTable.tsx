import { FaTicketAlt } from "react-icons/fa";

interface Ticket {
    id: string;
    type: string;
    price: number;
    quantity: number;
    limitPerUser: number;
}

interface TicketTableProps {
    tickets: Ticket[];
}

export default function TicketTable({ tickets }: TicketTableProps) {
    return (
        <div className="bg-blancCasse text-bleuNuit rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
                <FaTicketAlt className="inline-block mr-2" />
                Types de Billets
            </h3>
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b">
                        <th className="py-2">Type</th>
                        <th className="py-2">Prix</th>
                        <th className="py-2">Disponibilité</th>
                        <th className="py-2">Limite par Utilisateur</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket) => (
                        <tr key={ticket.id} className="border-b">
                            <td className="py-3">{ticket.type}</td>
                            <td className="py-3">{ticket.price} Ar</td>
                            <td className="py-3">{ticket.quantity} disponibles</td>
                            <td className="py-3">{ticket.limitPerUser} max</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}