import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';


export default NextAuth({
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.NEXT_AUTH_GOOGLE_ID!,
      clientSecret: process.env.NEXT_AUTH_GOOGLE_SECRET!
    }),
  ],
  secret:process.env.NEXTAUTH_SECRET!,
})