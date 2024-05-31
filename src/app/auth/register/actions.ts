"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export async function registerUser(data: RegisterData) {
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

  const newUser = await prisma.users.create({
    data,
  });

  const { password: _, ...user } = newUser;

  return user;
}
