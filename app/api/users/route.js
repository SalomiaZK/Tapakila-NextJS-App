import { Prisma } from "@prisma/client";


const prisma = new Prisma()


export async function GET() {
    try {
      const users = await prisma.event.findMany();
      return new Response(JSON.stringify(users), {
        status: 200,
      });
    } catch (error) {
      return new Response('Error fetching users', {
        status: 500,
      });
    }
  }