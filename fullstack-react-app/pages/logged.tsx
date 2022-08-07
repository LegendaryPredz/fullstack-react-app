import { authOptions } from '../pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from "next-auth/next"
import { getSession, signOut } from 'next-auth/react'
import { Button, Center, Container, Flex, Text } from '@chakra-ui/react'

function LoggedPage({ session }) {
  return (
    <Container py="64px">
      <Center>
        <Flex flexDirection="column">
          <Text mb="24px">
            👋 Welcome back {session.user.name}!
          </Text>
          <Button onClick={() => signOut()}>Log out</Button>
        </Flex>
      </Center>
    </Container>
  )
}

export default LoggedPage

export async function getServerSideProps(context) {
  //is the current user logged or not? authenticated?
  const session = await unstable_getServerSession(context.req, context.res, authOptions)
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
