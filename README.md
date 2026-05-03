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

## Project Structure

```
src/
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

