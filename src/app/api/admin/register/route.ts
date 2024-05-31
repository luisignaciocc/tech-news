import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export async function POST(request: NextRequest) {
  const data: RegisterData = await request.json();

  return NextResponse.json({
    data: data,
    message: "Registering...",
  });
}
