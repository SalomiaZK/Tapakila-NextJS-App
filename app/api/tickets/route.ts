import { prisma } from "@/lib/prisma";
import { Status, Type } from "@prisma/client";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const status = url.searchParams.get('status');
    const type = url.searchParams.get('type');

    if (id || status || type) {
      const tickets = await prisma.ticket.findMany({
        where: {
          event_id: String(id),
          ticket_status: status ? (status as Status) : undefined,
          ticket_type: type ? (type as Type) : undefined,
        },
      });

      return Response.json({ tickets }, { status: 200 });
    } else {
      const ticketCount = await prisma.ticket.count({
        where: {
          ticket_status: "SOLD",
        }
      });

      return Response.json({ count: ticketCount }, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return Response.json(
      { error: 'Repository Error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}


//  ========== ADMIN ==========
export async function DELETE(request: Request) {
  try {
    const { ticketNumber } = await request.json()
    const foundTickets = await prisma.ticket.findMany({
      take: Number(ticketNumber),
      where: {
        ticket_status: "AVAILABLE"
      }
    })

    const deleteTickets = await prisma.ticket.deleteMany({
      where: {
        ticket_id: {
          in: foundTickets.map(t => t.ticket_id)
        }
      }
    })

    return new Response(JSON.stringify(deleteTickets), { status: 200 });

  } catch (e) {
    console.error("Error while deleting the ticket", e)
    return new Response(JSON.stringify({ error: "Repository error" }),
      { status: 500 }
    );

  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    const { ticketNumber, idEvent, ticket_type, ticketPrice } = await request.json()

    const lastTicket = await prisma.ticket.findFirst({
      orderBy: {
        ticket_id: "desc"
      }
    })
    let created = 0
    let lastId = lastTicket && lastTicket.ticket_id && lastTicket.event_id
      ? parseInt(lastTicket.ticket_id.split(lastTicket.event_id + "TKT").join(""))
      : 0;

    for (let i = 0; i < ticketNumber; i++) {
      lastId += 1
      created += 1

      await prisma.ticket.create({
        data: {
          ticket_id: idEvent + "TKT" + lastId,
          ticket_status: "AVAILABLE",
          event_id: idEvent,
          ticket_type: ticket_type,
          ticket_price: ticketPrice
        }
      })
    }

    return new Response(JSON.stringify({ created: created }), { status: 201 })

  } catch (e) {
    console.error("Error while creating the ticket", e)
    return new Response(JSON.stringify({ error: "Repository erro" }),
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
