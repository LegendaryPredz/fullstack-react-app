import { NextApiRequest, NextApiResponse } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import { authOptions, prisma } from "../auth/[...nextauth]";


type TodoUpdate = {
  title?: string
  isCompleted?: boolean
}

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!["PUT", "DELETE"].includes(req.method || "")) {
    res.status(405).send('Method Not Allowd');
    return
  }

  const session: Session | null = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).send('Unauthorized')
    return
  }

  if (req.method === 'PUT') {
    const { pid } = req.query
    const { title, isCompleted } = req.body

    const updatedData: TodoUpdate = {}
    if (title) updatedData.title = title
    if (isCompleted !== undefined) updatedData.isCompleted = isCompleted

    const id: string = pid.toString()
    const todo = await prisma.todo.update({
      where: { id },
      data: updatedData,
    })

    return res.json(todo)
  }

  if (req.method === 'DELETE') {
    const { pid } = req.query
    const id: string = pid.toString()
    const todo = await prisma.todo.delete({
      where: { id },
    })
    return res.json(todo)
  }
}

export default handler 
