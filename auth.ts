import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

declare module "next-auth" {
  interface User {
    username?: string
    avatar?: string
  }
  
  interface Session {
    user: User & {
      username?: string
      avatar?: string
    }
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.username = profile.login
        token.name = profile.name
        token.avatar = profile.avatar_url
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username as string
        session.user.avatar = token.avatar as string
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
})
