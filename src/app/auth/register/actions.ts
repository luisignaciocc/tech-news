"use server";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export async function registerUser(data: RegisterData) {
  try {
    const prisma = new PrismaClient();

    const usernameFound = await prisma.users.findUnique({
      where: {
        username: data.username,
      },
    });

    if (usernameFound) {
      return { success: false, message: "User already exists" };
    }

    const emailFound = await prisma.users.findFirst({
      where: {
        email: {
          equals: data.email,
          mode: "insensitive",
        },
      },
    });

    if (emailFound) {
      return { success: false, message: "Email already exists" };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await prisma.users.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
      },
    });

    return { success: true, message: "User registered successfully" };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while registering the user",
    };
  }
}
