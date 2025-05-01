import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { mergeIntervals } from "@/lib/progress";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { lectureId, intervals, lastPosition } = await req.json();
    
    if (!lectureId || !Array.isArray(intervals) || lastPosition === undefined) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    
    // Get the lecture to calculate progress
    const lecture = await prisma.lecture.findUnique({
      where: { id: lectureId },
      select: { duration: true }
    });
    
    if (!lecture) {
      return NextResponse.json({ error: "Lecture not found" }, { status: 404 });
    }
    
    // Find existing progress
    const existingProgress = await prisma.progress.findUnique({
      where: {
        userId_lectureId: {
          userId: session.user.id as string,
          lectureId,
        },
      },
    });
    
    // Merge existing and new intervals
    const combinedIntervals = existingProgress 
      ? [...(existingProgress.watchedIntervals as { start: number, end: number }[]), ...intervals]
      : intervals;
    
    const mergedIntervals = mergeIntervals(combinedIntervals);
    
    // Calculate total unique watched seconds
    let totalWatchedSeconds = 0;
    for (const interval of mergedIntervals) {
      totalWatchedSeconds += interval.end - interval.start;
    }
    
    // Calculate progress percentage
    const progressPercentage = Math.min(100, Math.round((totalWatchedSeconds / lecture.duration) * 100));
    
    // Update or create progress
    const progress = await prisma.progress.upsert({
      where: {
        userId_lectureId: {
          userId: session.user.id as string,
          lectureId,
        },
      },
      create: {
        userId: session.user.id as string,
        lectureId,
        watchedIntervals: mergedIntervals,
        progressPercentage,
        lastPosition,
      },
      update: {
        watchedIntervals: mergedIntervals,
        progressPercentage,
        lastPosition,
      },
    });
    
    return NextResponse.json(progress);
  } catch (error) {
    console.error("Error updating progress:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const url = new URL(req.url);
    const lectureId = url.searchParams.get("lectureId");
    
    if (!lectureId) {
      return NextResponse.json({ error: "Lecture ID is required" }, { status: 400 });
    }
    
    const progress = await prisma.progress.findUnique({
      where: {
        userId_lectureId: {
          userId: session.user.id as string,
          lectureId,
        },
      },
    });
    
    if (!progress) {
      return NextResponse.json({
        watchedIntervals: [],
        progressPercentage: 0,
        lastPosition: 0,
      });
    }
    
    return NextResponse.json(progress);
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}