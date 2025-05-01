"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface CourseProgressProps {
  className?: string;
}

export function CourseProgress({ className }: CourseProgressProps) {
  const data = [
    { name: "Web Dev", progress: 75 },
    { name: "JS", progress: 45 },
    { name: "React", progress: 90 },
    { name: "Data Struct", progress: 60 },
    { name: "Python", progress: 30 },
    { name: "Machine Learning", progress: 20 },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Course Progress</CardTitle>
        <CardDescription>Your progress across all enrolled courses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="progress" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 space-y-4">
          {data.map((course, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{course.name}</span>
                <span className="text-sm text-muted-foreground">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}