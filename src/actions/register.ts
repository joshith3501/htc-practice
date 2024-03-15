"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/lib/schema";
import { db } from "@/lib/db";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name, wallet } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);

  const existingUser = await db.user.findUnique({ where: { email } });

  if (existingUser) {
    return { error: "email already in use!" };
  }

  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      walletAddress: wallet,
    },
  });

  // TODO: Send Vertification Token Email

  return { success: "Registered!" };
};
