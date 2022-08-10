import React from "react"
import { authOptions, UserSession } from '../pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from "next-auth/next"
import { getSession, signOut } from 'next-auth/react'
import { Button, Center, Container, Flex, Text } from '@chakra-ui/react'
import { Todos } from '../components/organisms/Todos/Todos'
import { TodosContainer } from '../components/organisms/Todos/TodosContainer'
import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next'
import { TodoCreator } from '../components/molecules/TodoCreator/TodoCreator'

function LoggedPage({ session }: { session: UserSession }) {
  const [refreshTodoToken, setRefreshTodoToken] = React.useState<string>("")
  return (
    <Container py="64px">
      <Center>
        <Flex flexDirection="column">
          <Text mb="24px">
            👋 Welcome back {session?.user?.name}!
          </Text>
          <Button onClick={() => signOut()}>Log out</Button>

          <TodoCreator
            onTodoCreated={() => setRefreshTodoToken(Math.random().toString())}
          />
          <TodosContainer refreshTodoToken={refreshTodoToken} />
        </Flex>
      </Center>
    </Container>
  )
}


export default LoggedPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  //is the current user logged or not? authenticated?
  const session = await unstable_getServerSession(req, res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    }, // will be passed to the page component as props
  }
}
