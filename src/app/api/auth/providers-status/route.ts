import { NextResponse } from "next/server";

export async function GET() {
  const providersStatus = {
    google: !!(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET),
    github: !!(process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET),
  };

  return NextResponse.json(providersStatus);
}
