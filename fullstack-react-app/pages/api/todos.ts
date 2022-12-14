import { NextApiRequest, NextApiResponse } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import { authOptions, UserSession, prisma } from "./auth/[...nextauth]";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowd');
    return
  }

  const session: Session | null = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).send('Unauthorized')
    return
  }

  if (req.method === 'GET') {
    const userSession: UserSession = session as UserSession
    const todos = await prisma.todo.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
      where: {
        userId: userSession.userId,
      },
    })

    return res.json(todos)
  }
}

export default handler 
