import { prisma } from "@/lib/prisma";
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: {
        user_email: email
      },
    });

    if (!user) {
      return Response.json(
        { error: 'user not found' },
        { status: 404 }
      );
    }

    if (password !== user.user_password) {
      return Response.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    const accessToken = crypto.randomUUID().split('-').join('');

    // Renvoyer une réponse réussie
    return Response.json(
      { accessToken, redirectTo: '/' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    return Response.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}