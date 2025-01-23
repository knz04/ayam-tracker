"use server";

import bcrypt from "bcrypt";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { signUpSchema, signInSchema } from "./zod";
import { createSession, deleteSession } from "./sessions";

export async function register(formData: FormData) {
  const { username, email, password } = signUpSchema.parse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const hashedPassword = await bcrypt.hash(password, 10);

  await sql`INSERT INTO "Users" (username, email, password) VALUES (${username}, ${email}, ${hashedPassword})`;

  redirect("/");
}

export async function login(prevState: any, formData: FormData) {
  const result = signInSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { username, password } = result.data;

  const resultFromDb =
    await sql`SELECT * FROM "Users" WHERE username = ${username}`;
  const user = resultFromDb.rows[0];

  if (!user) {
    return {
      errors: { username: "User not found" },
    };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return {
      errors: { password: "Invalid email or password" },
    };
  }

  await createSession(user.id);

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/");
}

export async function getUsername(userId: string) {
  const result = await sql`SELECT username FROM "Users" WHERE id = ${userId}`;
  return result.rows[0].username;
}

export async function getAyamPart() {
  const result = await sql`SELECT part FROM "Ayam"`;
  return result.rows;
}
