import NextAuth, { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession`, and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's id */
      id: string;
    } & DefaultSession["user"];
  }
  interface JWT {
    user: {
      /** The user's id */
      sub: string;
    } & DefaultJWT["user"];
  }
}