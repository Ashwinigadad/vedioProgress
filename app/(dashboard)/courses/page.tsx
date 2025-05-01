import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Progress } from "@/components/ui/progress";

export default function CoursesPage() {
  const courses = [
    {
      id: "1",
      title: "Web Development Fundamentals",
      description: "Learn the basics of HTML, CSS, and JavaScript",
      instructor: "John Doe",
      totalLectures: 12,
      progress: 75,
      thumbnail: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: "2",
      title: "JavaScript Masterclass",
      description: "Advanced JavaScript concepts and patterns",
      instructor: "Jane Smith",
      totalLectures: 20,
      progress: 45,
      thumbnail: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: "3",
      title: "React Essentials",
      description: "Build modern web applications with React",
      instructor: "Mike Johnson",
      totalLectures: 15,
      progress: 90,
      thumbnail: "https://images.pexels.com/photos/11035363/pexels-photo-11035363.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: "4",
      title: "Data Structures & Algorithms",
      description: "Master the fundamentals of computer science",
      instructor: "Lisa Chen",
      totalLectures: 24,
      progress: 60,
      thumbnail: "https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: "5",
      title: "Python for Data Science",
      description: "Learn Python for data analysis and visualization",
      instructor: "David Wilson",
      totalLectures: 18,
      progress: 30,
      thumbnail: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: "6",
      title: "Machine Learning Fundamentals",
      description: "Introduction to machine learning algorithms",
      instructor: "Sarah Rodriguez",
      totalLectures: 22,
      progress: 20,
      thumbnail: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
  ];

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Courses"
        text="Browse all available courses and track your progress."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <div className="aspect-video w-full h-48 overflow-hidden">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="object-cover w-full h-full"
              />
            </div>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Instructor: {course.instructor}</span>
                <span className="text-sm text-muted-foreground">{course.totalLectures} lectures</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/courses/${course.id}`} className="w-full">
                <Button className="w-full">Continue Learning</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}