import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    email?: string | null;
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {} & DefaultSession["user"];
  }
}
