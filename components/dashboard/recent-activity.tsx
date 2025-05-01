"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface RecentActivityProps {
  className?: string;
}

export function RecentActivity({ className }: RecentActivityProps) {
  const activities = [
    { 
      title: "Web Development Fundamentals", 
      lecture: "CSS Flexbox Layouts", 
      progress: 75,
      time: "2 hours ago" 
    },
    { 
      title: "JavaScript Masterclass", 
      lecture: "Promises and Async/Await", 
      progress: 45,
      time: "Yesterday" 
    },
    { 
      title: "React Essentials", 
      lecture: "React Hooks", 
      progress: 90,
      time: "2 days ago" 
    },
    { 
      title: "Data Structures", 
      lecture: "Binary Search Trees", 
      progress: 60,
      time: "3 days ago" 
    },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your recent learning activity across courses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="rounded-full p-2 bg-muted w-8 h-8 flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>
              <div className="space-y-1 flex-1">
                <p className="text-sm font-medium leading-none">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.lecture}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>{activity.progress}% complete</span>
                  <span className="ml-auto">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}