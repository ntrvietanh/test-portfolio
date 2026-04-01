import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const certifications = await prisma.certification.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(certifications);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const certification = await prisma.certification.create({
      data: {
        name: body.name,
        issuer: body.issuer,
        issueDate: body.issueDate || null,
        expiryDate: body.expiryDate || null,
        credentialId: body.credentialId || null,
        credentialUrl: body.credentialUrl || null,
        order: body.order ?? 0,
      },
    });
    return NextResponse.json(certification, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
