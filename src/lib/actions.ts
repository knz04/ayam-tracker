"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  created_at: z.date(),
});

const RegisterUser = FormSchema.omit({ id: true, created_at: true });

export async function registerUser(formData: FormData) {
  const { username, email, password } = RegisterUser.parse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  const hashedPassword = await bcrypt.hash(password, 10);

  await sql`INSERT INTO "Users" (username, email, password) VALUES (${username}, ${email}, ${hashedPassword})`;

  redirect("/");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials";
        default:
          return "An error occurred";
      }
    }
    throw error;
  }
}
