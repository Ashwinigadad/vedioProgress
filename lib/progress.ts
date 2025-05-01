export function mergeIntervals(intervals: { start: number; end: number }[]): { start: number; end: number }[] {
  if (intervals.length === 0) return [];
  
  // Sort intervals by start time
  const sortedIntervals = [...intervals].sort((a, b) => a.start - b.start);
  const result: { start: number; end: number }[] = [sortedIntervals[0]];
  
  for (let i = 1; i < sortedIntervals.length; i++) {
    const currentInterval = sortedIntervals[i];
    const lastMergedInterval = result[result.length - 1];
    
    // If current interval overlaps with the last merged interval, merge them
    if (currentInterval.start <= lastMergedInterval.end) {
      lastMergedInterval.end = Math.max(lastMergedInterval.end, currentInterval.end);
    } else {
      // If no overlap, add the current interval to the result
      result.push(currentInterval);
    }
  }
  
  return result;
}

export async function updateWatchedIntervals(
  lectureId: string,
  start: number,
  end: number
): Promise<void> {
  try {
    // In a real app, this would make an API call to save the progress
    // For this demo, we'll simulate the API call
    console.log(`Updating watched interval for lecture ${lectureId}: ${start}-${end}`);
    
    // Send data to the API
    await fetch('/api/progress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lectureId,
        intervals: [{ start, end }],
        lastPosition: end,
      }),
    });
  } catch (error) {
    console.error('Error updating watched intervals:', error);
  }
}

export async function getProgressForLecture(lectureId: string) {
  try {
    const response = await fetch(`/api/progress?lectureId=${lectureId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch progress');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting progress:', error);
    return {
      watchedIntervals: [],
      progressPercentage: 0,
      lastPosition: 0,
    };
  }
}

export function calculateUniqueViewedPercentage(
  watchedIntervals: { start: number; end: number }[],
  totalDuration: number
): number {
  if (!watchedIntervals.length || totalDuration <= 0) {
    return 0;
  }
  
  const mergedIntervals = mergeIntervals(watchedIntervals);
  
  let totalWatchedSeconds = 0;
  for (const interval of mergedIntervals) {
    totalWatchedSeconds += interval.end - interval.start;
  }
  
  return Math.min(100, Math.round((totalWatchedSeconds / totalDuration) * 100));
}