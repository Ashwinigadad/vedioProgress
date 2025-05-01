import { VideoPlayer } from "@/components/video/video-player";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { VideoProgress } from "@/components/video/video-progress";
import { ProgressTracker } from "@/components/video/progress-tracker";
import { NotesTaking } from "@/components/video/notes-taking";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

export default function LecturePage({ params }: { params: { id: string } }) {
  // In a real app, this would be fetched from the database
  const lecture = {
    id: params.id,
    title: "CSS Flexbox Layouts",
    description: "Learn how to create flexible layouts using CSS Flexbox",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    courseId: "1",
    courseName: "Web Development Fundamentals",
    duration: 2700, // 45 minutes in seconds
    watchedIntervals: [
      { start: 0, end: 600 }, // 0-10 minutes
      { start: 900, end: 1200 }, // 15-20 minutes
    ],
    progressPercentage: 33,
    lastPosition: 1200, // 20 minutes
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading={lecture.title}
        text={`Part of: ${lecture.courseName}`}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <VideoPlayer 
            videoUrl={lecture.videoUrl} 
            lastPosition={lecture.lastPosition}
            lectureId={lecture.id}
          />
          
          <div className="mt-6">
            <VideoProgress 
              progressPercentage={lecture.progressPercentage}
              watchedIntervals={lecture.watchedIntervals}
              duration={lecture.duration}
            />
          </div>
          
          <div className="mt-8">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-2">About this lecture</h3>
                  <p className="text-muted-foreground">{lecture.description}</p>
                  
                  <h4 className="text-md font-semibold mt-6 mb-2">What you'll learn</h4>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Understanding the Flexbox layout model</li>
                    <li>Creating responsive layouts with Flexbox</li>
                    <li>Working with flex direction, wrap, and alignment</li>
                    <li>Building real-world examples using Flexbox</li>
                  </ul>
                </Card>
              </TabsContent>
              <TabsContent value="notes">
                <NotesTaking lectureId={lecture.id} />
              </TabsContent>
              <TabsContent value="resources">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Additional Resources</h3>
                  <ul className="space-y-3">
                    <li className="border-b pb-3">
                      <a href="#" className="text-primary hover:underline flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Flexbox Cheat Sheet.pdf
                      </a>
                    </li>
                    <li className="border-b pb-3">
                      <a href="#" className="text-primary hover:underline flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                        </svg>
                        CSS-Tricks Guide to Flexbox
                      </a>
                    </li>
                    <li className="border-b pb-3">
                      <a href="#" className="text-primary hover:underline flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Flexbox Froggy - Interactive Game
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Practice Exercise Files.zip
                      </a>
                    </li>
                  </ul>
                </Card>
              </TabsContent>
              <TabsContent value="discussions">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Discussion Forum</h3>
                  <p className="text-muted-foreground">Join the conversation about this lecture.</p>
                  
                  <div className="mt-4 border-t pt-4">
                    <p className="text-center text-muted-foreground">No discussions yet.</p>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <div>
          <ProgressTracker 
            lectureId={lecture.id}
            courseName={lecture.courseName}
            watchedIntervals={lecture.watchedIntervals}
            duration={lecture.duration}
            progressPercentage={lecture.progressPercentage}
          />
        </div>
      </div>
    </DashboardShell>
  );
}