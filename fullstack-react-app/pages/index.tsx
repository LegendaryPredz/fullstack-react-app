import { Flex } from '@chakra-ui/layout'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Hero } from '../components/molecules/Hero/Hero'
import { TopBar } from '../components/organisms/TopBar/TopBar'
import { LandingBody } from '../components/organisms//LandingBody/LandingBody'
import { LandingFooter } from '../components/organisms/LandingFooter/LandingFooter'
import { authOptions } from './api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>SuperApp</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopBar />
      <Flex>
        <Hero />
      </Flex>
      <LandingBody />
      <LandingFooter />
    </div>
  )
}

export default Home

export async function getServerSideProps(context: any) {
  //is the current user logged or not? authenticated?
  const session = await unstable_getServerSession(context.req, context.res, authOptions)
  if (session) {
    return {
      redirect: {
        destination: '/logged',
        permanent: false,
      },
    }
  }

  return {
    props: {}, // will be passed to the page component as props
  }
}
