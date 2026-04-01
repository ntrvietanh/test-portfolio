import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const about = await prisma.about.findFirst();
    return NextResponse.json(about);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const existing = await prisma.about.findFirst();

    const data = {
      name: body.name,
      title: body.title,
      bio: body.bio,
      avatar: body.avatar,
      email: body.email,
      github: body.github,
      linkedin: body.linkedin,
      twitter: body.twitter,
      skills: JSON.stringify(body.skills),
    };

    let about;
    if (existing) {
      about = await prisma.about.update({ where: { id: existing.id }, data });
    } else {
      about = await prisma.about.create({ data });
    }

    return NextResponse.json(about);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
