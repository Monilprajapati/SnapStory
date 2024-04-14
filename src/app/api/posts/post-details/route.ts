import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const postID = url.searchParams.get("postID");

    const postDetails = await prisma.post.findUnique({
      where: {
        id: Number(postID),
      },
    });

    if (postDetails) {
      return NextResponse.json({
        success: true,
        data: postDetails,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to fetch the blog details ! Please try again",
      });
    }
  } catch (e) {
    console.log(e);

    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again",
    });
  }
}
