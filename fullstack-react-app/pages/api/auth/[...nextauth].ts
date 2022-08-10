import NextAuth, { Session, User } from "next-auth"
import type { NextAuthOptions } from 'next-auth'

import GitHubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { JWT } from "next-auth/jwt";

// add prisma to the NodeJS global type
declare module NodeJS {
  interface Global {
    prisma: PrismaClient
  }
}

// Prevent multiple instances of Prisma Client in development
declare const global: NodeJS.Global

export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') global.prisma = prisma


type SessionArg = {
  session: Session,
  user: User,
  token: JWT
}

export type UserSession = {
  userId: string
} & Session

export const authOptions: NextAuthOptions = {
  // your configs
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_ID || "",
      clientSecret: process.env.TWITTER_SECRET || "",
      version: "2.0", // opt-in to Twitter OAuth 2.0
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || ''
    }),
  ],
  callbacks: {
    session: async ({ session, user }: SessionArg) => {
      session.userId = user.id
      return Promise.resolve(session as UserSession)
    }
  }
}

export default NextAuth(authOptions);
