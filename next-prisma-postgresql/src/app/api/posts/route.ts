import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await prisma.posts.findMany({
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to get post" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const post = await prisma.posts.create({
      data: {
        context: body.content,
        user_id: 1,
        area_id: 1,
        latitude: body.latitude,
        longitude: body.longitude,
        created_at: new Date(),
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
