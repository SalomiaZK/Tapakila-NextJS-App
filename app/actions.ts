"user server";

import { prisma } from "@/lib/prisma";
import { Type } from "@prisma/client";

// acheter un ou beaucoup de ticket
export async function BookATicket({ data }: { data: { userId: string, ticketNumber: number, requestType: "CANCEL" | "BOOK", ticketType: Type } }) {
    try {
        const { userId, ticketNumber, ticketType, requestType /**CANCEL | BOOK */ } = data


        if (requestType == "BOOK") {

            const foundTickets = await prisma.ticket.findMany({
                take: ticketNumber,
                where: {
                    ticket_status: "AVAILABLE",
                    ticket_type: ticketType
                }
            })

            if (foundTickets.length == 0) {
                return new Response(JSON.stringify({ message: "no more ticket available for this type" }))
            }

            const book = await prisma.ticket.updateMany({
                where: {
                    ticket_id: {
                        in: foundTickets.map(t => t.ticket_id)
                    }
                },
                data: {
                    ticket_status: 'SOLD',
                    user_id: userId
                }

            })

            return new Response(JSON.stringify(book), { status: 200 })

        } else {
            // si on veut annuler
            const foundTickets = await prisma.ticket.findMany({
                take: ticketNumber,
                where: {
                    user_id: userId,
                    ticket_type: ticketType
                }
            })

            if (foundTickets.length == 0) {
                return new Response(JSON.stringify({ message: "you have booked no ticket of that type" }))
            }
            const cancel = await prisma.ticket.updateMany({
                where: {
                    ticket_id: {
                        in: foundTickets.map(t => t.ticket_id)
                    }
                },
                data: {
                    ticket_status: "AVAILABLE",
                    user_id: null
                }
            })

            return new Response(JSON.stringify(cancel), { status: 200 })

        }

    } catch (e) {
        console.error("Error while updating the ticket", e)
    } finally {
        await prisma.$disconnect()
    }

}
