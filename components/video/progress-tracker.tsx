"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Clock, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { formatTime } from "@/lib/format";
import { useEffect, useState } from "react";
import Link from "next/link";

interface ProgressTrackerProps {
  lectureId: string;
  courseName: string;
  watchedIntervals: { start: number; end: number }[];
  duration: number;
  progressPercentage: number;
}

export function ProgressTracker({
  lectureId,
  courseName,
  watchedIntervals,
  duration,
  progressPercentage,
}: ProgressTrackerProps) {
  const [uniqueWatchedSeconds, setUniqueWatchedSeconds] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  
  useEffect(() => {
    // Calculate total unique seconds watched
    let totalSeconds = 0;
    
    // Sort intervals by start time and merge overlapping intervals
    const sortedIntervals = [...watchedIntervals].sort((a, b) => a.start - b.start);
    const mergedIntervals: { start: number; end: number }[] = [];
    
    for (const interval of sortedIntervals) {
      // Check if this interval overlaps with the previous one
      if (mergedIntervals.length === 0 || mergedIntervals[mergedIntervals.length - 1].end < interval.start) {
        mergedIntervals.push(interval);
      } else {
        // Merge overlapping intervals
        const lastInterval = mergedIntervals[mergedIntervals.length - 1];
        lastInterval.end = Math.max(lastInterval.end, interval.end);
      }
    }
    
    // Calculate total seconds from merged intervals
    for (const interval of mergedIntervals) {
      totalSeconds += interval.end - interval.start;
    }
    
    setUniqueWatchedSeconds(totalSeconds);
    setRemainingSeconds(Math.max(0, duration - totalSeconds));
  }, [watchedIntervals, duration]);

  return (
    <div className="space-y-6 sticky top-24">
      <Card>
        <CardHeader>
          <CardTitle>Progress Tracking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Overall progress</span>
              <span className="text-sm text-muted-foreground">{progressPercentage}%</span>
            </div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-2 bg-primary rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
            
            <div className="h-2 w-full bg-muted rounded-full mt-1">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
              <Clock className="h-6 w-6 mb-2 text-primary" />
              <span className="text-sm text-muted-foreground">Watched</span>
              <span className="text-xl font-bold">{formatTime(uniqueWatchedSeconds)}</span>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
              <BarChart className="h-6 w-6 mb-2 text-primary" />
              <span className="text-sm text-muted-foreground">Remaining</span>
              <span className="text-xl font-bold">{formatTime(remainingSeconds)}</span>
            </div>
          </div>
          
          <div className="pt-2">
            <h4 className="text-sm font-medium mb-2">To complete this lecture:</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                <span className="text-sm">
                  Watch remaining {formatTime(remainingSeconds)} of unique content
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                <span className="text-sm">
                  Complete all sections without skipping
                </span>
              </li>
            </ul>
          </div>
          
          <div className="pt-2">
            <Link href={`/courses/1`}>
              <Button variant="outline" className="w-full">
                Back to Course
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Next Lectures</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Link href={`/lectures/8`} className="flex items-center justify-between hover:bg-muted p-2 rounded-md transition-colors">
              <span className="font-medium">Responsive Design Basics</span>
              <span className="text-sm text-muted-foreground">38m</span>
            </Link>
            <Link href={`/lectures/9`} className="flex items-center justify-between hover:bg-muted p-2 rounded-md transition-colors">
              <span className="font-medium">Introduction to JavaScript</span>
              <span className="text-sm text-muted-foreground">42m</span>
            </Link>
            <Link href={`/lectures/10`} className="flex items-center justify-between hover:bg-muted p-2 rounded-md transition-colors">
              <span className="font-medium">JS Variables and Data Types</span>
              <span className="text-sm text-muted-foreground">35m</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}