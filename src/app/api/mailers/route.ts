import { NextResponse } from "next/server";

export async function GET() {
  const mailers = [
    { id: 1, name: "Mailer 1" },
    { id: 2, name: "Mailer 2" },
    { id: 3, name: "Mailer 3" },
  ];
  return NextResponse.json(mailers);
}
