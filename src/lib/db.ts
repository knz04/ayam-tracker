"use server";

import bcrypt from "bcrypt";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { signUpSchema } from "./zod";

export async function registerUser(formData: FormData) {
  const { username, email, password } = signUpSchema.parse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const hashedPassword = await bcrypt.hash(password, 10);

  await sql`INSERT INTO "Users" (username, email, password) VALUES (${username}, ${email}, ${hashedPassword})`;

  redirect("/");
}
