import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { compare } from "bcrypt";
import db from "./db";
// import { UserRole } from "@prisma/client";
export const authOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // console.log("Authorize function recieved credentials:", credentials);
          // Check if user credentials are they are Not empty
          if (!credentials?.email || !credentials?.password) {
            throw { error: "No Inputs Found", status: 401 };
          }
          //Check if user exists
          const existingUserEmailVerifiedFalse = await db.user.findUnique({
            where: { email: credentials.email, emailVerified: false },
          });
          {
            if (existingUserEmailVerifiedFalse) {
              throw { error: "Email Not Verified", status: 401 };
            }
          }
          
          console.log("Passed Check 1 ");
          const existingUser = await db.user.findUnique({
            where: { email: credentials.email, emailVerified: true },
          });
          if (!existingUser) {
            console.log("No user found");
            throw { error: "No user found", status: 401 };
          }

          console.log("Passed Check 2");

          //Check if Password is correct
          const passwordMatch = await compare(
            credentials.password,
            existingUser.password
          );
          if (!passwordMatch) {
            console.log("Password incorrect");
            throw { error: "Password Incorrect", status: 401 };
          }
          console.log("Pass 3 Checked");
          const user = {
            id: existingUser.id,
            username: existingUser.username,
            email: existingUser.email,
            role: existingUser.role,
            imageUrl: existingUser.imageUrl,
            emailVerified: existingUser.emailVerified,
          };
          //
          console.log("User Compiled");
          // console.log(user);
          return user;
        } catch (error) {
          console.error("aLL Failed");
          console.error(error);
          throw { error: "Something went wrong", status: 401 };
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        // console.log(`token:${token} in session`);
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.imageUrl = token.imageUrl;
        session.user.emailVerified = token.emailVerified;
      }
      // console.log(`session:${session.user}`);
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.role = user.role;
        token.imageUrl = user.imageUrl;
        token.emailVerified = user.emailVerified;
      }
      // console.log(`token:${token}`);
      return token;
    },
  },
};
