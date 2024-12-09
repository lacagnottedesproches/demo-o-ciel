import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.username;
        const pwd = credentials?.password;
        if (!email || !pwd) {
          return null;
        }
        const now = new Date();
        if (email === process.env.DEMO_EMAIL && pwd === "super") {
          return {
            id: now.getTime().toString(),
            email,
          };
        }
        return null;
      },
    }),
  ],
  session: {
    maxAge: 60 * 60 * 24, // in seconds, 24 hours
  },
});
