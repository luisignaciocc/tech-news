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

  console.log(data);

  return NextResponse.json({ message: "Registering..." });
}
