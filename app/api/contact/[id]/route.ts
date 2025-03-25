import { prisma } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const message = await prisma.message.findUnique({
            where: {
                message_id: id
            },
            include: {
                user: true
            }
        })

        if (message == null) {
            return new Response(JSON.stringify({ error: "Message not found" }), { status: 404 })
        }
        return new Response(JSON.stringify(message), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }
    catch (e) {
        console.error("Error finding the message ", e)
        return new Response(JSON.stringify({ error: "Repository erro" }),
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}
