import { NextApiHandler } from "next";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "john@doe.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        console.log(credentials);
        return {
          id: "user123",
          name: "John Doe",
          email: credentials.email,
        };
      },
    }),
  ],
};

const handler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);

export { handler as GET, handler as POST };
