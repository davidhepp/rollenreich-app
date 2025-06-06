import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://naas.isalman.dev/no", {
      method: "GET",
    });

    if (response.ok) {
      const responseText = await response.text();
      const parsedResponse = JSON.parse(responseText);
      return NextResponse.json(parsedResponse);
    } else {
      return NextResponse.json(
        { error: "Failed to subscribe to newsletter" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to connect to the newsletter service",
      },
      { status: 500 }
    );
  }
}
