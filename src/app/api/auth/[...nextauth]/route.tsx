import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextApiHandler } from "next";
import { NextAuthOptions } from "next-auth";
import { Session } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

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
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const userFound = await prisma.users.findFirst({
          where: {
            email: {
              equals: credentials?.email,
              mode: "insensitive",
            },
          },
        });

        if (!userFound) return null;

        const matchPassword = await bcrypt.compare(
          credentials?.password,
          userFound.password,
        );

        if (!matchPassword) return null;

        return {
          id: userFound.id,
          name: userFound.username,
          email: userFound.email,
        };
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      return {
        ...session,
        user: token.user as Session["user"],
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        return { ...token, user };
      }
      return token;
    },
  },
};

const handler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);

export { handler as GET, handler as POST };
