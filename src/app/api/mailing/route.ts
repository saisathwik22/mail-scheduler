import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { mailerId, listId, schedule } = await req.json();

  if (!mailerId || !listId || !schedule) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    message: "Mailing created successfully",
    data: { mailerId, listId, schedule },
  });
}
