# Mock Users for Testing

The backend automatically creates these mock users on first startup. You can use these credentials to login and test the application.

## Mock User Accounts

### Talent Seekers (Students looking for opportunities)

1. **John Doe**
   - Email: `john@example.com`
   - Password: `password123`
   - Role: Seeker
   - Skills: React, JavaScript, Node.js, MongoDB
   - Interests: web-development, startup, backend
   - Experience Level: Intermediate
   - Location: Remote
   - Availability: Part-time

2. **Jane Smith**
   - Email: `jane@example.com`
   - Password: `password123`
   - Role: Seeker
   - Skills: Python, Django, Machine Learning
   - Interests: ai, data-science, research
   - Experience Level: Advanced
   - Location: New York
   - Availability: Full-time

### Talent Finders (Employers posting opportunities)

3. **TechStart Inc.**
   - Email: `techstart@example.com`
   - Password: `password123`
   - Role: Finder
   - Can post job opportunities

4. **StartupXYZ**
   - Email: `startup@example.com`
   - Password: `password123`
   - Role: Finder
   - Can post job opportunities

## Mock Job Posts

The backend also creates 3 sample job posts:

1. **Frontend Developer Intern** - TechStart Inc.
2. **Backend Developer for Startup** - StartupXYZ
3. **UI/UX Designer** - Design Studio

## How to Use

1. Start the backend server:
   ```bash
   cd server
   npm install
   npm start
   ```

2. Start the frontend:
   ```bash
   npm install
   npm start
   ```

3. Login with any of the mock user accounts above

4. Explore the application:
   - As a Seeker: Browse jobs, apply, save favorites
   - As a Finder: Create posts, view applicants, manage opportunities

## Database Setup

Make sure MongoDB is running on your system:
- Local MongoDB: `mongodb://localhost:27017/campusconnect`
- Or use MongoDB Atlas (cloud) - update `MONGODB_URI` in `.env`

The mock data will be automatically created when you start the server for the first time.

