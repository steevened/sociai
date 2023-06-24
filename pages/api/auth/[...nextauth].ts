import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),

    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise),
  // callbacks: {
  //   session: async (session, user) => {
  //     session.user = user;
  //     return session;
  //   },
  // },
};
export default NextAuth(authOptions);
