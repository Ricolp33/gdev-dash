import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID !,
      clientSecret: process.env.DISCORD_CLIENT_SECRET !,
    }),

  ],
  pages: {
    signIn: "/", //sigin page
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub as string;// token.uid or token.sub both work
      }
      return session;
    },
    jwt: async ({ token, account, profile }) => {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.id = profile?.sub
      }
      return token
    }
  },
};
