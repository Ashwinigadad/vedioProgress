"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatTime } from "@/lib/format";
import { useEffect, useState } from "react";

interface VideoProgressProps {
  progressPercentage: number;
  watchedIntervals: { start: number; end: number }[];
  duration: number;
}

export function VideoProgress({ 
  progressPercentage,
  watchedIntervals,
  duration 
}: VideoProgressProps) {
  const [uniqueWatchedSeconds, setUniqueWatchedSeconds] = useState(0);
  
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
  }, [watchedIntervals]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Video Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span>Overall progress</span>
              <span>{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">Unique seconds watched</span>
              <span className="text-2xl font-bold">{formatTime(uniqueWatchedSeconds)}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">Total video duration</span>
              <span className="text-2xl font-bold">{formatTime(duration)}</span>
            </div>
          </div>
          
          <div className="pt-4 space-y-2">
            <h3 className="text-lg font-medium">Watched Segments</h3>
            <div className="relative h-6 bg-muted rounded-md overflow-hidden">
              {watchedIntervals.map((interval, index) => {
                const startPercent = (interval.start / duration) * 100;
                const widthPercent = ((interval.end - interval.start) / duration) * 100;
                
                return (
                  <div
                    key={index}
                    className="absolute h-full bg-primary opacity-70"
                    style={{
                      left: `${startPercent}%`,
                      width: `${widthPercent}%`,
                    }}
                  />
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0:00</span>
              <span>{formatTime(Math.floor(duration / 4))}</span>
              <span>{formatTime(Math.floor(duration / 2))}</span>
              <span>{formatTime(Math.floor(duration * 3 / 4))}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}