import { NextApiRequest, NextApiResponse } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import { authOptions, UserSession, prisma } from "./auth/[...nextauth]";

// POST /api/todo -> create todo 
export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).send('Method Not Allowd');
    return
  }

  const session: Session | null = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).send('Unauthorized')
    return
  }

  if (req.method === 'POST') {
    // POST /api/todo -> create todo 
    const { title } = req.body


    if (!title) {
      res.status(400).send('Bad Request')
      return
    }

    const userSession: UserSession = session as UserSession
    const todo = await prisma.todo.create({
      data: {
        title,
        userId: userSession.userId,
        isCompleted: false,
      },
    })

    return res.json(todo)
  }
}

export default handler 
