import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import type { User } from "@/lib/definitions";
import bcrypt from "bcrypt";

// Define the structure of a user for NextAuth
interface NextAuthUser {
  id: string;
  name: string | null;
  email: string | null;
}

// Fetch user from the database
async function getUser(username: string): Promise<User | undefined> {
  try {
    const user =
      await sql<User>`SELECT * FROM "Users" WHERE username=${username}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user: ", error);
    throw new Error("Failed to fetch user");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      async authorize(credentials) {
        // Parse and validate credentials using Zod
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string() })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          const user = await getUser(username);

          if (!user) return null;

          // Compare the provided password with the stored hashed password
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            // Map database user to NextAuth user structure
            const nextAuthUser: NextAuthUser = {
              id: user.id.toString(),
              name: user.username,
              email: user.email,
            };
            return nextAuthUser; // Return user object expected by NextAuth
          }
        }

        console.log("Invalid credentials");
        return null; // Return null if validation fails
      },
    }),
  ],
});
