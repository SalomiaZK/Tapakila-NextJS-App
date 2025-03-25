import { prisma } from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const user = await prisma.user.findUnique({
            where: {
                user_id: id
            },
            include:{
                tickets: true
            }
        })
        return new Response(JSON.stringify(user), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }
    catch (e) {
        console.error("Error finding the user ", e)
        return new Response(JSON.stringify({ error: "Repository erro" }),
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const body = await request.json()
        const { id } = await params
        const userToUpdate = await prisma.user.findUnique({
            where: {
                user_id: id
            }
        })

        if (userToUpdate == null) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 })
        }
        else {
            const updatedUser = await prisma.user.update({
                where: {
                    user_id: userToUpdate.user_id
                },
                data: body

            })

            return new Response(JSON.stringify(updatedUser), { status: 200 })
        }
    } catch (e) {
        console.error("Error while deleting the user", e)
        return new Response(JSON.stringify({ error: "Repository error" }),
            { status: 500 }
        )

    } finally {
        await prisma.$disconnect()
    }
}


// ============ ADMIN============ : only admin can delete user or the user itself
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {

        const { id } = await params
        const userToDelete = await prisma.user.findUnique({
            where: {
                user_id: id
            }
        })

        if (userToDelete == null) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 })
        }
        else {
            const userDeleted = await prisma.user.delete({
                where: {
                    user_id: userToDelete.user_id
                }
            })

            return new Response(JSON.stringify(userDeleted), { status: 200 })
        }
    } catch (e) {
        console.error("Error while deleting the user", e)
        return new Response(JSON.stringify({ error: "Repository error" }),
            { status: 500 }
        )


    } finally {
        await prisma.$disconnect()
    }
}


// why can't I send a pull request ?????