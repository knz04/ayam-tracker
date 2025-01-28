"use server";

import bcrypt from "bcrypt";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { signUpSchema, signInSchema } from "./zod";
import { createSession, deleteSession, decrypt } from "./sessions";
import { cookies } from "next/headers";

export async function register(prevState: any, formData: FormData) {
  const result = signUpSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  const { username, email, password } = result.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await sql`INSERT INTO "Users" (username, email, password) VALUES (${username}, ${email}, ${hashedPassword})`;
  } catch (error) {
    return {
      errors: {},
      message: "Database error: Failed to create user.",
    };
  }

  redirect("/");
}

export async function login(prevState: any, formData: FormData) {
  const result = signInSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  const { username, password } = result.data;

  try {
    const resultFromDb =
      await sql`SELECT * FROM "Users" WHERE username = ${username}`;
    const user = resultFromDb.rows[0];

    if (!user) {
      return {
        message: "Invalid username or password",
      };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return {
        message: "Invalid username or password",
      };
    }

    await createSession(user.id);
  } catch (error) {
    return {
      errors: {},
      message: "Database error: Failed to login.",
    };
  }

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/");
}

export async function getUsername() {
  // Get the session cookie
  const session = (await cookies()).get("session")?.value;

  // Decrypt the session to get the payload (which contains userId)
  const payload = await decrypt(session);

  if (!payload || typeof payload.userId !== "number") {
    throw new Error("Session is not valid or userId is not a string");
  }

  const userId = payload.userId; // Now we are sure userId is a string

  // Fetch the username using the userId
  const result = await sql`SELECT username FROM "Users" WHERE id = ${userId}`;

  if (result.rows.length === 0) {
    throw new Error("User not found");
  }

  return result.rows[0].username; // Return the username
}

export async function getAyamPart() {
  const result = await sql`SELECT * FROM "Ayam"`;
  return result.rows;
}

export async function getRecentAyam() {
  const session = (await cookies()).get("session")?.value;

  // Decrypt the session to get the payload (which contains userId)
  const payload = await decrypt(session);

  if (!payload || typeof payload.userId !== "number") {
    throw new Error("Session is not valid or userId is not a string");
  }

  const userId = payload.userId;

  // Query the Logs table and join with the Ayam table
  const result = await sql`
    SELECT 
      l.rating, 
      l.created_at, 
      a.part AS part_name 
    FROM 
      "Logs" l
    JOIN 
      "Ayam" a ON l.part_id = a.id
    WHERE 
      l.user_id = ${userId}
    ORDER BY 
      l.created_at DESC 
    LIMIT 3
  `;

  return result.rows;
}
