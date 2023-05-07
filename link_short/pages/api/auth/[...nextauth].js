import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";

const prisma = new PrismaClient()
 
export const authOptions=({
    
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
          }),
          EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM
          }),
      ],
      secret: process.env.NEXTAUTH_SECRET,
        theme: {
            colorScheme: "light",
          },
          callbacks: {
            async jwt({ token }) {
              token.userRole = "admin"
              return token
            },
          },

  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },

})
export default NextAuth(authOptions)
