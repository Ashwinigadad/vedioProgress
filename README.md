🔍 Problem Statement
Build a system that accurately tracks a user's video watching progress by only counting unique segments watched, preventing progress inflation from rewatching or skipping content.

🎯 Objective
Create a tool that:

Tracks only newly watched video segments

Persists progress between sessions

Resumes playback from last position

Calculates accurate completion percentage

🛠️ Tech Stack
Frontend: Next.js, React

Backend: Next.js API routes

Database: Prisma with SQLite (or your chosen database)

Video Player: React Player or similar library

🌟 Features Implemented
Unique Interval Tracking

Records only never-before-seen video segments

Merges overlapping intervals

Progress Calculation

Calculates percentage based on unique watched duration

Updates in real-time

Session Persistence

Saves progress to database

Resumes playback on return

User Interface

Video player with progress tracking

Visual progress indicator

🚀 Getting Started
Prerequisites
Node.js (v18 or later)

npm or yarn

Git

Installation
Clone the repository:

bash
git clone https://github.com/your-username/video-progress-tracker.git
cd video-progress-tracker
Install dependencies:

bash
npm install
# or
yarn install
Set up environment variables:
Create a .env file in the root directory:

env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
Initialize the database:

bash
npx prisma migrate dev --name init
npx prisma generate
Run the development server:

bash
npm run dev
# or
yarn dev
Open your browser and navigate to:

http://localhost:3000
🏗️ Project Structure
.
├── app/                  # Next.js app router
│   ├── api/              # API routes
│   ├── auth/             # Authentication
│   └── (main)/           # Main application pages
├── components/           # Reusable components
├── lib/                  # Utility functions
├── prisma/               # Database schema
├── public/               # Static assets
├── styles/               # Global styles
└── types/                # TypeScript types
🔧 Key Implementation Details
1. Interval Tracking Logic
typescript
// Merges overlapping intervals and calculates unique duration
function mergeIntervals(intervals: [number, number][]) {
  if (intervals.length === 0) return [];
  
  intervals.sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [intervals[0]];
  
  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    const current = intervals[i];
    
    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      merged.push(current);
    }
  }
  
  return merged;
}

// Calculates total unique duration
function calculateUniqueDuration(intervals: [number, number][]) {
  return intervals.reduce((sum, [start, end]) => sum + (end - start), 0);
}
2. Progress Calculation
typescript
// Calculates progress percentage
function calculateProgress(
  watchedIntervals: [number, number][],
  videoDuration: number
) {
  if (videoDuration === 0) return 0;
  const uniqueDuration = calculateUniqueDuration(watchedIntervals);
  return Math.min(100, (uniqueDuration / videoDuration) * 100);
}
3. Data Persistence
typescript
// Save progress to database
async function saveProgress(
  userId: string,
  videoId: string,
  newIntervals: [number, number][]
) {
  // Get existing intervals from DB
  const existing = await prisma.progress.findUnique({
    where: { userId_videoId: { userId, videoId } }
  });
  
  // Merge with new intervals
  const allIntervals = [...(existing?.intervals || []), ...newIntervals];
  const merged = mergeIntervals(allIntervals);
  
  // Save to database
  await prisma.progress.upsert({
    where: { userId_videoId: { userId, videoId } },
    update: { intervals: merged },
    create: { userId, videoId, intervals: merged }
  });
}