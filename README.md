📹 Video Progress Tracker
A simple system to accurately track unique video-watching progress, persist it across sessions, and resume playback from the last position.

🚀 Tech Stack
Frontend: Next.js, React

Backend: Next.js API Routes

Database: Prisma with SQLite

Video Player: React Player

📦 Getting Started
📋 Prerequisites
Node.js (v18 or later)

npm or yarn

Git

📥 Installation
1️⃣ Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/video-progress-tracker.git
cd video-progress-tracker
2️⃣ Install dependencies:

bash
Copy
Edit
npm install
# or
yarn install
3️⃣ Set up environment variables:
Create a .env file in the root directory:

env
Copy
Edit
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
4️⃣ Initialize the database:

bash
Copy
Edit
npx prisma migrate dev --name init
npx prisma generate
5️⃣ Start the development server:

bash
Copy
Edit
npm run dev
# or
yarn dev
6️⃣ Open your browser:

arduino
Copy
Edit
http://localhost:3000
📁 Project Structure
php
Copy
Edit
.
├── app/                  # App routes & API endpoints
├── components/           # Reusable UI components
├── lib/                  # Utility functions
├── prisma/               # Prisma schema and migrations
├── public/               # Static assets
├── styles/               # Global styles
├── types/                # TypeScript types
└── ...