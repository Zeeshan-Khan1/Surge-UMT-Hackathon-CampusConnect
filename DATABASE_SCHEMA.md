# CampusConnect Database Schema

This document describes the MongoDB database schema for CampusConnect.

## Collections

### 1. Users

Stores user account information.

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  role: String (enum: ['finder', 'seeker'], default: 'seeker'),
  skills: [String],
  interests: [String],
  experienceLevel: String,
  location: String,
  availability: String,
  profileImage: String,
  verified: Boolean (default: false),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

**Indexes:**
- `email` (unique)

**Mock Users:**
- `john@example.com` / `password123` (Seeker)
- `jane@example.com` / `password123` (Seeker)
- `techstart@example.com` / `password123` (Finder)
- `startup@example.com` / `password123` (Finder)

### 2. Posts

Stores job posts/opportunities.

```javascript
{
  _id: ObjectId,
  title: String (required),
  company: String (required),
  description: String (required),
  location: String (required),
  type: String (required), // 'Part-time', 'Full-time', 'Project-based', etc.
  salary: String,
  requiredSkills: [String],
  experienceLevel: String,
  tags: [String],
  timeCommitment: String (required), // 'Part-time', 'Full-time', 'Flexible'
  status: String (enum: ['draft', 'open', 'filled', 'closed'], default: 'draft'),
  postedBy: ObjectId (ref: 'User', required),
  views: Number (default: 0),
  applications: Number (default: 0),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

**Indexes:**
- `postedBy`
- `status`
- `createdAt` (for sorting)

### 3. Applications

Stores job applications from seekers.

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', required),
  postId: ObjectId (ref: 'Post', required),
  status: String (enum: ['pending', 'shortlisted', 'accepted', 'rejected'], default: 'pending'),
  resume: String (URL),
  message: String,
  matchScore: Number,
  appliedAt: Date (default: Date.now)
}
```

**Indexes:**
- `userId`
- `postId`
- `status`

### 4. SavedJobs

Stores bookmarked/saved jobs by seekers.

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', required),
  postId: ObjectId (ref: 'Post', required),
  savedAt: Date (default: Date.now)
}
```

**Indexes:**
- `userId`
- `postId`
- Unique compound index on `userId` and `postId`

### 5. Chats

Stores chat conversations.

```javascript
{
  _id: ObjectId,
  participants: [ObjectId] (ref: 'User'),
  postId: ObjectId (ref: 'Post'),
  lastMessage: String,
  lastMessageAt: Date,
  createdAt: Date (default: Date.now)
}
```

**Indexes:**
- `participants`
- `postId`

### 6. Messages

Stores individual messages within chats.

```javascript
{
  _id: ObjectId,
  chatId: ObjectId (ref: 'Chat', required),
  senderId: ObjectId (ref: 'User', required),
  text: String (required),
  createdAt: Date (default: Date.now)
}
```

**Indexes:**
- `chatId`
- `createdAt` (for sorting)

## Relationships

```
User 1:N Post (postedBy)
Post 1:N Application (postId)
User 1:N Application (userId)
User 1:N SavedJob (userId)
Post 1:N SavedJob (postId)
Chat N:N User (participants)
Chat 1:N Message (chatId)
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Posts
- `GET /api/posts` - Get all posts (with optional filters)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post (protected)
- `PUT /api/posts/:id` - Update post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)

### Applications
- `GET /api/applications` - Get applications (protected)
- `POST /api/applications` - Create application (protected)
- `PUT /api/applications/:id` - Update application status (protected)

### Saved Jobs
- `GET /api/saved-jobs` - Get saved jobs (protected)
- `POST /api/saved-jobs` - Save job (protected)
- `DELETE /api/saved-jobs/:id` - Remove saved job (protected)

## Mock Data

The server automatically initializes mock data on first start:
- 4 mock users (2 seekers, 2 finders)
- 3 mock job posts
- All users have password: `password123`

## Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/campusconnect
JWT_SECRET=your-secret-key
```

