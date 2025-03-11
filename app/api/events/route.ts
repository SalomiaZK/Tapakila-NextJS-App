import { prisma } from "@/lib/prisma"


export async function GET() {
    const events = await prisma.event.findMany(
    );
    return new Response(JSON.stringify(events), {status:200, headers: {'Content-Type': 'application/json'}});
}









export async function POST(request : Request) {


  try{
    const body =await request.json()
    const { event_name, event_place, event_category, event_date, event_description, event_organizer , event_id, event_image, admin_id} = body
    if(!event_name|| !event_place || !event_category || !event_date){
        return new Response(JSON.stringify({error: 'those field must be filled! '}))
    }
    else{
        const newEv = await prisma.event.create({
         data: {
            event_name,
            event_place,
            event_category,
            event_date,
            event_description,
            event_image,
            event_organizer,
            event_id,
            admin_id// replace 'defaultAdmin' with the appropriate value
         }
            
        })

        return new Response(JSON.stringify(newEv) , {
            status: 201
        })
    }}
    catch(error){
      console.error("Error while creating the event", error)
      return new Response(JSON.stringify({ error : "Repository erro"}),
      {status : 500} 
    )
    }

    finally{
      await prisma.$disconnect()
    }
}




/**import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    // Récupérez les données du corps de la requête
    const body = await request.json();
    const { name, locationId, adminId } = body;

    // Validez les données (exemple simple)
    if (!name || !locationId || !adminId) {
      return new Response(JSON.stringify({ error: 'Tous les champs sont obligatoires' }), {
        status: 400, // Bad Request
      });
    }

    // Créez un nouvel événement dans la base de données
    const newEvent = await prisma.event.create({
      data: {
        name,
        location: { connect: { id: locationId } }, // Liez l'événement à un lieu existant
        admin: { connect: { id: adminId } }, // Liez l'événement à un administrateur existant
      },   

      include: {
        location: true, // Incluez les informations du lieu dans la réponse
        admin: true, // Incluez les informations de l'administrateur dans la réponse
      },
    });

    // Retournez la réponse avec le nouvel événement créé
    return new Response(JSON.stringify(newEvent), {
      status: 201, // Created
    });
  } catch (error) {
    console.error('Erreur lors de la création de l\'événement :', error);
    return new Response(JSON.stringify({ error: 'Erreur de base de données' }), {
      status: 500, // Internal Server Error
    });
  } finally {
    await prisma.$disconnect();
  }
} */