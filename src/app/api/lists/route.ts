import { NextResponse } from "next/server";

export async function GET() {
  const lists = [
    { id: 1, name: "List 1" },
    { id: 2, name: "List 2" },
    { id: 3, name: "List 3" },
  ];
  return NextResponse.json(lists);
}
