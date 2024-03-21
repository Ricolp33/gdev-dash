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
};
