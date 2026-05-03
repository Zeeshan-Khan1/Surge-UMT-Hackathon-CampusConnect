<<<<<<< HEAD
# CampusConnect - The University Talent Finder App

A comprehensive web application built with React.js that connects university students for part-time jobs, startups, projects, and competitions. This app serves as a platform for students to find opportunities and for employers to find talented students.

## Features

### Core Features

- **Landing Page** - Modern, responsive UI with sections for overview, features, and login/signup CTA
- **Authentication System** - Complete authentication with:
  - Email/Password sign up and login
  - Email verification
  - Password reset
  - OAuth integration (Google & GitHub)
  - Role switching (Talent Finder ↔ Talent Seeker) without logout

- **Talent Finder Dashboard** - For posting opportunities:
  - Create, edit, delete, and manage job posts
  - Save drafts
  - View applicants with match scores
  - Shortlist candidates
  - Real-time messaging with applicants
  - Mark posts as filled
  - Analytics (views, applications)

- **Talent Seeker Dashboard** - For finding opportunities:
  - Browse and filter job opportunities
  - Track application status
  - Save/bookmark jobs
  - Upload resumes or send proposal messages
  - Personalized recommendations based on interests
  - Smart matching system showing compatibility scores

- **Smart Matching System** - AI-powered matching algorithm that calculates:
  - Skills compatibility
  - Experience level match
  - Interest alignment
  - Location preference
  - Availability match

- **Chat System** - Real-time messaging between Finders and Seekers
- **Push Notifications** - Alerts for new messages and application updates (ready for Firebase Cloud Messaging)

## Tech Stack

- **Frontend**: React.js 18.2.0
- **Routing**: React Router DOM 6.20.0
- **Styling**: Tailwind CSS 3.3.6
- **Backend/Database**: Firebase (Firestore, Authentication, Storage)
- **Icons**: Lucide React
- **Build Tool**: Create React App
=======
# CampusConnect - Surge '25 Web Hackathon

CampusConnect is a talent discovery platform built for the Surge '25 Web Hackathon. It connects students through opportunities for part-time work, startup gigs, academic projects, competitions, and collaborations.

## Deployment Link


## Important
### Try Demo: Click Login → Select a role → Use password: demo123
This is also mentioned on the landing page just for Information

## Features

### 🎯 Core Features

1. **Landing Page** - Beautiful, modern landing page with feature highlights
2. **Authentication System**
   - User sign up and login
   - Email/password authentication
   - OAuth integration placeholders (Google, GitHub)
   - Role switching (Talent Finder ↔ Talent Seeker) without logging out

3. **Talent Finder Dashboard**
   - Create and manage job postings
   - Save drafts before publishing
   - Edit, delete, and mark posts as filled
   - View applicant management (view, shortlist, message)
   - Analytics dashboard (views, applications, interest rate)

4. **Talent Seeker Dashboard**
   - Browse all available opportunities
   - Filter/search jobs by title, type, or tags
   - Personalized recommendations based on skills/interests
   - Save/bookmark jobs
   - Application status tracking (Pending, Shortlisted, Rejected, Accepted)
   - Upload resumes or custom proposal messages

5. **Match Score Algorithm**
   - Calculate compatibility between user profiles and job postings
   - Shows percentage match (e.g., "You match 85% of this opportunity")
   - Breakdown by skills, interests, experience, and profile completeness

6. **Real-time Chat System**
   - Direct messaging between seekers and finders
   - Conversation management
   - Message read status
   - Responsive chat interface

7. **Profile Management**
   - Edit profile information
   - Manage skills and interests
   - Set experience level
   - Profile completeness scoring

## Technology Stack

- **Frontend**: React 18 with Vite
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **Database**: localStorage (for demo; ready for backend integration)
- **Styling**: CSS with CSS Variables

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Zeeshan-Khan1/Surge-UMT-25-WebDev.git
cd Surge-UMT-25-WebDev
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

   
>>>>>>> f4cbe6ffad823cc4df6bc46c331abe73849277e5

## Project Structure

```
src/
<<<<<<< HEAD
├── components/          # Reusable React components
│   ├── ChatBox.js      # Real-time chat component
│   ├── JobCard.js      # Job listing card
│   ├── PostForm.js     # Form for creating/editing posts
│   ├── ApplicantList.js # List of applicants for a job
│   └── ProtectedRoute.js # Route protection component
├── pages/              # Main page components
│   ├── LandingPage.js  # Home page
│   ├── Login.js        # Login page
│   ├── Signup.js       # Signup page
│   ├── TalentFinderDashboard.js  # Dashboard for employers
│   └── TalentSeekerDashboard.js  # Dashboard for students
├── context/            # React Context providers
│   └── AuthContext.js  # Authentication context
├── config/             # Configuration files
│   └── firebase.js     # Firebase configuration
├── utils/              # Utility functions
│   ├── matching.js     # Smart matching algorithm
│   └── data.js         # Dummy data for development
├── App.js              # Main App component with routing
├── index.js            # Entry point
└── index.css           # Global styles with Tailwind
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Quick Start

1. **Start the Backend Server**
   ```bash
   cd server
   npm install
   npm start
   ```
   The backend will run on `http://localhost:5000`

2. **Start the Frontend**
   ```bash
   # In the root directory
   npm install
   npm start
   ```
   The frontend will open at `http://localhost:3000`

### Full Setup

1. **Clone or navigate to the project directory**
   ```bash
   cd Surge-UMT-25-WebDev
   ```

2. **Set up MongoDB**
   - Option A: Install MongoDB locally (default: `mongodb://localhost:27017/campusconnect`)
   - Option B: Use MongoDB Atlas (cloud) - update `MONGODB_URI` in `server/.env`

3. **Configure Backend**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   npm start
   ```

4. **Configure Frontend**
   ```bash
   # In the root directory
   npm install
   # Create .env file (optional, defaults to http://localhost:5000/api)
   # REACT_APP_API_URL=http://localhost:5000/api
   npm start
   ```

### Mock Users

The backend automatically creates mock users on first startup. See `MOCK_USERS.md` for login credentials:

- **Seekers:** `john@example.com` / `password123` or `jane@example.com` / `password123`
- **Finders:** `techstart@example.com` / `password123` or `startup@example.com` / `password123`

All users have the same password: `password123`

## Usage

### Development Mode

The app includes dummy data, so you can test all features without Firebase setup:

- **Login**: Use any email/password (no validation in dev mode)
- **Browse Jobs**: See sample job listings
- **Create Posts**: Create job posts (saved locally)
- **Apply to Jobs**: Submit applications
- **Chat**: Test messaging interface
- **Matching**: See match scores for jobs

### Production Setup

1. **Configure Firebase**
   - Set up Firestore collections: `users`, `posts`, `applications`, `savedJobs`, `chats`
   - Enable Firebase Authentication providers
   - Set up Firebase Storage for resume uploads

2. **Environment Variables**
   - Create `.env` file with Firebase credentials
   - Never commit `.env` to version control

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Deploy**
   - Deploy `build/` folder to hosting service (Firebase Hosting, Vercel, Netlify, etc.)

## Features Walkthrough

### For Talent Seekers (Students)

1. **Sign Up** - Create an account or use OAuth (Google/GitHub)
2. **Browse Jobs** - View available opportunities with smart filters
3. **Get Recommendations** - See personalized job recommendations based on your profile
4. **Apply** - Submit applications with resume and cover letter
5. **Track Applications** - Monitor application status
6. **Save Jobs** - Bookmark interesting opportunities
7. **Chat** - Communicate with employers directly

### For Talent Finders (Employers)

1. **Create Account** - Sign up as a Talent Finder
2. **Post Opportunities** - Create detailed job posts with requirements
3. **Manage Posts** - Edit, delete, or mark posts as filled
4. **View Applicants** - See all applicants with match scores
5. **Shortlist Candidates** - Mark promising candidates
6. **Chat** - Message applicants directly
7. **Analytics** - Track views and applications per post

## Smart Matching Algorithm

The matching system calculates compatibility based on:

- **Skills Match (40%)** - Compares required skills with user skills
- **Experience Level (20%)** - Matches experience requirements
- **Interests (20%)** - Aligns job tags with user interests
- **Location (10%)** - Checks location preferences
- **Availability (10%)** - Matches time commitment needs

## Database Schema

### Firestore Collections

- **users**: User profiles with role, skills, interests
- **posts**: Job posts with all details
- **applications**: Job applications with status
- **savedJobs**: Bookmarked jobs by users
- **chats**: Chat conversations
- **messages**: Individual messages within chats

## Authentication Flow

1. User signs up or logs in
2. Email verification sent (optional)
3. Role selection (Talent Finder or Seeker)
4. Profile completion
5. Can switch roles anytime without logging out

## Future Enhancements

- [ ] Resume upload and parsing
- [ ] Advanced analytics dashboard
- [ ] Push notifications (Firebase Cloud Messaging)
- [ ] Video interviews integration
- [ ] Recommendation engine improvements
- [ ] Multi-language support
- [ ] Mobile app version

## Contributing

This is a hackathon project. Contributions and improvements are welcome!

## License

MIT License - Feel free to use this project for learning and development.

## Support

For issues or questions, please create an issue in the repository or contact the development team.

## Acknowledgments

Built for the Surge UMT 25 WebDev Hackathon with React.js and Firebase.

---

**Happy Coding! 🚀**

=======
├── pages/
│   ├── LandingPage.jsx           # Landing page
│   ├── LoginPage.jsx             # Login page
│   ├── SignUpPage.jsx            # Sign-up page
│   ├── TalentFinderDashboard.jsx # Dashboard for job posters
│   ├── TalentSeekerDashboard.jsx # Dashboard for job seekers
│   ├── JobDetailPage.jsx         # Individual job detail page
│   ├── ProfilePage.jsx           # User profile management
│   └── ChatPage.jsx              # Messaging interface
│
├── contexts/
│   └── AuthContext.jsx           # Authentication context provider
│
├── services/
│   ├── database.js               # Local storage or API simulation
│   └── matchScore.js             # Algorithm for matching seekers & finders
│
├── App.jsx                        # Root component with routing
├── main.jsx                       # React entry point (renders App)
├── index.css                      # Global styles

.vscode/                            # VS Code workspace settings
node_modules/                       # Installed dependencies
.gitignore                          # Files ignored by Git
index.html                          # Vite entry HTML
package.json                        # Project metadata and scripts
package-lock.json                   # Dependency lock file
README.md                           # Project documentation
SETUP_NOTES.md                      # Setup or usage notes
vite.config.js                      # Vite configuration file
extract-pdf.js                      # Utility script (for PDF handling)

```
## Key Features Implementation

### Match Score Algorithm

The match score calculates compatibility between user profiles and job postings based on:
- **Skills Match (40% weight)**: Compares user skills with job required skills
- **Tag/Interest Match (25% weight)**: Matches user interests with job tags
- **Experience Level (20% weight)**: Checks if user meets job experience requirements
- **Profile Completeness (15% weight)**: Evaluates how complete the user profile is

### Recommendation System

Jobs are recommended based on:
1. Match score (highest first)
2. Recency (newer posts prioritized)
3. User preferences and skills

### Database Structure

The application uses localStorage for demo purposes. Data structures include:
- **Users**: Email, password (hashed in production), name, skills, interests, experience level
- **Jobs**: Title, description, type, tags, required skills, status, analytics
- **Applications**: Job ID, user ID, message, status
- **Messages**: From/To user IDs, text, read status, timestamp

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Future Enhancements

1. **Backend Integration**: Replace localStorage with a real database (MongoDB/PostgreSQL)
2. **Real-time Chat**: Implement WebSockets or Firebase for real-time messaging
3. **Push Notifications**: Add browser push notification support
4. **Email Verification**: Implement email verification flow
5. **Password Reset**: Add password reset functionality
6. **OAuth Integration**: Complete Google and GitHub OAuth integration
7. **File Uploads**: Add resume/CV upload functionality
8. **Advanced Analytics**: More detailed analytics for job posters
9. **AI Matching**: Enhanced AI-powered job matching algorithm

## Judging Criteria Alignment

- ✅ **Functionality (30 Points)**: All core requirements implemented
- ✅ **Design & UX (20 Points)**: Modern, clean UI with responsive design
- ✅ **Scalability & Architecture (20 Points)**: Well-structured codebase ready for backend integration
- ✅ **Engineering Logic (15 Points)**: Match score algorithm and recommendation system
- ✅ **Presentation & Demo (15 Points)**: Ready for live demonstration

## License

This project was created for the Surge '25 Web Hackathon.

## Contributors
- Zeeshan khan
- Aiza Dawood
- Ethisham Tasadduq

Built for Surge '25 Web Hackathon competition.
>>>>>>> f4cbe6ffad823cc4df6bc46c331abe73849277e5
