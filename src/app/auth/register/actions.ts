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
      throw new Error("User already exists");
    }

    const emailFound = await prisma.users.findUnique({
      where: {
        email: data.email,
      },
    });

    if (emailFound) {
      throw new Error("Email already exists");
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
