import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import Link from "next/link";
import { Clock, Users, Award } from "lucide-react";

export default function CoursePage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch course details from the database
  const course = {
    id: params.id,
    title: "Web Development Fundamentals",
    description: "Learn the basics of HTML, CSS, and JavaScript to build responsive websites from scratch.",
    instructor: "John Doe",
    totalLectures: 12,
    totalDuration: "6h 45m",
    totalStudents: 1243,
    progress: 75,
    lectures: [
      { id: "1", title: "Introduction to HTML", duration: "32m", progress: 100 },
      { id: "2", title: "HTML Document Structure", duration: "28m", progress: 100 },
      { id: "3", title: "Working with Text and Links", duration: "35m", progress: 100 },
      { id: "4", title: "Adding Images and Media", duration: "25m", progress: 100 },
      { id: "5", title: "Introduction to CSS", duration: "40m", progress: 100 },
      { id: "6", title: "CSS Box Model", duration: "30m", progress: 100 },
      { id: "7", title: "CSS Flexbox Layouts", duration: "45m", progress: 75 },
      { id: "8", title: "Responsive Design Basics", duration: "38m", progress: 0 },
      { id: "9", title: "Introduction to JavaScript", duration: "42m", progress: 0 },
      { id: "10", title: "JavaScript Variables and Data Types", duration: "35m", progress: 0 },
      { id: "11", title: "DOM Manipulation", duration: "40m", progress: 0 },
      { id: "12", title: "Building a Simple Project", duration: "55m", progress: 0 },
    ],
    thumbnail: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  };

  return (
    <DashboardShell>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <DashboardHeader
            heading={course.title}
            text={course.description}
          />
          
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{course.totalDuration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{course.totalStudents} students</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Certificate on completion</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Course Content</h3>
            <div className="space-y-3">
              {course.lectures.map((lecture) => (
                <Card key={lecture.id}>
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">{lecture.title}</span>
                        <span className="text-xs text-muted-foreground">{lecture.duration}</span>
                      </div>
                      <Progress value={lecture.progress} className="h-1 mt-2" />
                    </div>
                    <Link href={`/lectures/${lecture.id}`}>
                      <Button variant={lecture.progress === 0 ? "default" : lecture.progress === 100 ? "outline" : "secondary"}>
                        {lecture.progress === 0 ? "Start" : lecture.progress === 100 ? "Review" : "Continue"}
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <Card className="sticky top-24">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="object-cover w-full h-full"
              />
            </div>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
              <CardDescription>Additional details about this course</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-1">Instructor</h4>
                <p className="text-sm text-muted-foreground">{course.instructor}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-1">Total Lectures</h4>
                <p className="text-sm text-muted-foreground">{course.totalLectures}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-1">Duration</h4>
                <p className="text-sm text-muted-foreground">{course.totalDuration}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-1">Enrolled Students</h4>
                <p className="text-sm text-muted-foreground">{course.totalStudents}</p>
              </div>
              <Link href={`/lectures/${course.lectures[0].id}`}>
                <Button className="w-full">Start Learning</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}