import { NextResponse } from "next/server";

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (!key) {
      return NextResponse.json(
        { error: "Missing key parameter" },
        { status: 400 },
      );
    }

    // Construct S3 URL
    const url = `${S3_BASE_URL}/${key}`;

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Media API Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
