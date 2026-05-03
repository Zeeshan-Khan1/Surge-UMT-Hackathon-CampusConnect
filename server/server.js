const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/campusconnect';

// Improved MongoDB connection with better error handling
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log('✅ MongoDB Connected successfully!');
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  console.log('\n📝 To fix this:');
  console.log('   1. Install MongoDB locally: sudo apt-get install mongodb');
  console.log('   2. OR use MongoDB Atlas (free): https://www.mongodb.com/cloud/atlas');
  console.log('   3. Update MONGODB_URI in server/.env\n');
  console.log('⚠️  Server will continue but database operations will fail until MongoDB is connected.');
});

// Database Schemas
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['finder', 'seeker'], default: 'seeker' },
  skills: [String],
  interests: [String],
  experienceLevel: String,
  location: String,
  availability: String,
  profileImage: String,
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  salary: String,
  requiredSkills: [String],
  experienceLevel: String,
  tags: [String],
  timeCommitment: { type: String, required: true },
  status: { type: String, enum: ['draft', 'open', 'filled', 'closed'], default: 'draft' },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  views: { type: Number, default: 0 },
  applications: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  status: { type: String, enum: ['pending', 'shortlisted', 'accepted', 'rejected'], default: 'pending' },
  resume: String,
  message: String,
  matchScore: Number,
  appliedAt: { type: Date, default: Date.now }
});

const savedJobSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  savedAt: { type: Date, default: Date.now }
});

const chatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  lastMessage: String,
  lastMessageAt: Date,
  createdAt: { type: Date, default: Date.now }
});

const messageSchema = new mongoose.Schema({
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);
const Application = mongoose.model('Application', applicationSchema);
const SavedJob = mongoose.model('SavedJob', savedJobSchema);
const Chat = mongoose.model('Chat', chatSchema);
const Message = mongoose.model('Message', messageSchema);

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  // Use mock mode if MongoDB not connected
  if (isMockMode()) {
    const { name, email, password, role } = req.body;
    
    if (MOCK_USERS[email]) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    const newUser = {
      id: `mock_user_${Object.keys(MOCK_USERS).length + 1}`,
      name,
      email,
      password, // In production, hash this
      role: role || 'seeker'
    };
    
    MOCK_USERS[email] = newUser;
    
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    return res.status(201).json({
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  }
  
  // MongoDB mode (existing code)
  try {
    const { name, email, password, role } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'seeker'
    });
    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Use mock mode if MongoDB not connected
    if (isMockMode()) {
      const user = MOCK_USERS[email];
      
      if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );

      return res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          skills: user.skills || [],
          interests: user.interests || [],
          experienceLevel: user.experienceLevel,
          location: user.location,
          availability: user.availability
        }
      });
    }

    // MongoDB mode (existing code)
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        skills: user.skills,
        interests: user.interests,
        experienceLevel: user.experienceLevel,
        location: user.location,
        availability: user.availability
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get current user
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    // Use mock mode if MongoDB not connected
    if (isMockMode()) {
      // Find user by ID in mock users
      const user = Object.values(MOCK_USERS).find(u => u.id === req.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const { password, ...userWithoutPassword } = user;
      return res.json(userWithoutPassword);
    }
    
    // MongoDB mode
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Posts Routes
app.get('/api/posts', async (req, res) => {
  try {
    const { status, postedBy, search } = req.query;
    
    // Use mock mode if MongoDB not connected
    if (isMockMode()) {
      let posts = [...MOCK_POSTS];
      
      if (status && status !== 'all') {
        posts = posts.filter(p => p.status === status);
      }
      
      if (postedBy) {
        posts = posts.filter(p => (p.postedBy._id || p.postedBy) === postedBy);
      }
      
      if (search) {
        const searchLower = search.toLowerCase();
        posts = posts.filter(p => 
          p.title.toLowerCase().includes(searchLower) ||
          p.company.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
        );
      }
      
      return res.json(posts);
    }
    
    // MongoDB mode
    let query = {};
    
    if (status) query.status = status;
    if (postedBy) query.postedBy = postedBy;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const posts = await Post.find(query)
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/posts/:id', async (req, res) => {
  try {
    // Use mock mode if MongoDB not connected
    if (isMockMode()) {
      const post = MOCK_POSTS.find(p => p._id === req.params.id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      // Increment views
      post.views += 1;
      return res.json(post);
    }
    
    // MongoDB mode
    const post = await Post.findById(req.params.id).populate('postedBy', 'name email');
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    // Increment views
    post.views += 1;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/posts', authenticateToken, async (req, res) => {
  try {
    const postData = { ...req.body, postedBy: req.userId };
    const post = new Post(postData);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/posts/:id', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (post.postedBy.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    Object.assign(post, req.body);
    post.updatedAt = Date.now();
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/posts/:id', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (post.postedBy.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Applications Routes
app.post('/api/applications', authenticateToken, async (req, res) => {
  try {
    const { postId, resume, message } = req.body;
    
    // Check if already applied
    const existing = await Application.findOne({ userId: req.userId, postId });
    if (existing) {
      return res.status(400).json({ error: 'Already applied' });
    }

    const application = new Application({
      userId: req.userId,
      postId,
      resume,
      message
    });
    await application.save();

    // Increment application count
    const post = await Post.findById(postId);
    post.applications += 1;
    await post.save();

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/applications', authenticateToken, async (req, res) => {
  try {
    const { postId, userId } = req.query;
    let query = {};
    
    if (postId) query.postId = postId;
    if (userId) query.userId = userId;
    else query.userId = req.userId;

    const applications = await Application.find(query)
      .populate('userId', 'name email')
      .populate('postId', 'title company')
      .sort({ appliedAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/applications/:id', authenticateToken, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    Object.assign(application, req.body);
    await application.save();
    res.json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Saved Jobs Routes
app.post('/api/saved-jobs', authenticateToken, async (req, res) => {
  try {
    const { postId } = req.body;
    const savedJob = new SavedJob({
      userId: req.userId,
      postId
    });
    await savedJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/saved-jobs', authenticateToken, async (req, res) => {
  try {
    const savedJobs = await SavedJob.find({ userId: req.userId })
      .populate('postId')
      .sort({ savedAt: -1 });
    res.json(savedJobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/saved-jobs/:id', authenticateToken, async (req, res) => {
  try {
    await SavedJob.findByIdAndDelete(req.params.id);
    res.json({ message: 'Saved job removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Initialize Mock Data
async function initializeMockData() {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('Initializing mock data...');
      
      // Create mock users
      const hashedPassword = await bcrypt.hash('password123', 10);
      
      const mockUsers = [
        {
          name: 'John Doe',
          email: 'john@example.com',
          password: hashedPassword,
          role: 'seeker',
          skills: ['React', 'JavaScript', 'Node.js', 'MongoDB'],
          interests: ['web-development', 'startup', 'backend'],
          experienceLevel: 'Intermediate',
          location: 'Remote',
          availability: 'Part-time',
          verified: true
        },
        {
          name: 'Jane Smith',
          email: 'jane@example.com',
          password: hashedPassword,
          role: 'seeker',
          skills: ['Python', 'Django', 'Machine Learning'],
          interests: ['ai', 'data-science', 'research'],
          experienceLevel: 'Advanced',
          location: 'New York',
          availability: 'Full-time',
          verified: true
        },
        {
          name: 'TechStart Inc.',
          email: 'techstart@example.com',
          password: hashedPassword,
          role: 'finder',
          verified: true
        },
        {
          name: 'StartupXYZ',
          email: 'startup@example.com',
          password: hashedPassword,
          role: 'finder',
          verified: true
        }
      ];

      const createdUsers = await User.insertMany(mockUsers);
      
      // Create mock posts
      const mockPosts = [
        {
          title: 'Frontend Developer Intern',
          company: 'TechStart Inc.',
          description: 'Looking for a passionate frontend developer to join our team. Experience with React is a plus.',
          location: 'Remote',
          type: 'Part-time',
          salary: '$20-30/hour',
          requiredSkills: ['React', 'JavaScript', 'HTML', 'CSS'],
          experienceLevel: 'Intermediate',
          tags: ['web-development', 'react', 'frontend'],
          timeCommitment: 'Part-time',
          status: 'open',
          postedBy: createdUsers[2]._id,
          views: 150,
          applications: 12
        },
        {
          title: 'Backend Developer for Startup',
          company: 'StartupXYZ',
          description: 'Join an exciting startup building the next big thing. Node.js and MongoDB experience required.',
          location: 'Hybrid',
          type: 'Part-time',
          salary: '$25-35/hour',
          requiredSkills: ['Node.js', 'MongoDB', 'Express', 'REST API'],
          experienceLevel: 'Advanced',
          tags: ['backend', 'nodejs', 'startup'],
          timeCommitment: 'Part-time',
          status: 'open',
          postedBy: createdUsers[3]._id,
          views: 200,
          applications: 18
        },
        {
          title: 'UI/UX Designer',
          company: 'Design Studio',
          description: 'Creative UI/UX designer needed for mobile app design projects.',
          location: 'Remote',
          type: 'Project-based',
          salary: '$30-40/hour',
          requiredSkills: ['Figma', 'Adobe XD', 'UI Design', 'UX Research'],
          experienceLevel: 'Intermediate',
          tags: ['design', 'ui-ux', 'mobile'],
          timeCommitment: 'Flexible',
          status: 'open',
          postedBy: createdUsers[2]._id,
          views: 180,
          applications: 15
        }
      ];

      await Post.insertMany(mockPosts);
      console.log('Mock data initialized successfully!');
    }
  } catch (error) {
    console.error('Error initializing mock data:', error);
  }
}

// Check if using mock mode (no MongoDB)
const isMockMode = () => mongoose.connection.readyState !== 1;

// Mock users for demo (works without MongoDB)
const MOCK_USERS = {
  'john@example.com': {
    id: 'mock_user_1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123', // In production, this would be hashed
    role: 'seeker',
    skills: ['React', 'JavaScript', 'Node.js', 'MongoDB'],
    interests: ['web-development', 'startup', 'backend'],
    experienceLevel: 'Intermediate',
    location: 'Remote',
    availability: 'Part-time'
  },
  'jane@example.com': {
    id: 'mock_user_2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'seeker',
    skills: ['Python', 'Django', 'Machine Learning'],
    interests: ['ai', 'data-science', 'research'],
    experienceLevel: 'Advanced',
    location: 'New York',
    availability: 'Full-time'
  },
  'techstart@example.com': {
    id: 'mock_user_3',
    name: 'TechStart Inc.',
    email: 'techstart@example.com',
    password: 'password123',
    role: 'finder'
  },
  'startup@example.com': {
    id: 'mock_user_4',
    name: 'StartupXYZ',
    email: 'startup@example.com',
    password: 'password123',
    role: 'finder'
  }
};

// Mock posts for demo
const MOCK_POSTS = [
  {
    _id: 'post_1',
    title: 'Frontend Developer Intern',
    company: 'TechStart Inc.',
    description: 'Looking for a passionate frontend developer to join our team. Experience with React is a plus.',
    location: 'Remote',
    type: 'Part-time',
    salary: '$20-30/hour',
    requiredSkills: ['React', 'JavaScript', 'HTML', 'CSS'],
    experienceLevel: 'Intermediate',
    tags: ['web-development', 'react', 'frontend'],
    timeCommitment: 'Part-time',
    status: 'open',
    postedBy: { _id: 'mock_user_3', name: 'TechStart Inc.', email: 'techstart@example.com' },
    views: 150,
    applications: 12,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: 'post_2',
    title: 'Backend Developer for Startup',
    company: 'StartupXYZ',
    description: 'Join an exciting startup building the next big thing. Node.js and MongoDB experience required.',
    location: 'Hybrid',
    type: 'Part-time',
    salary: '$25-35/hour',
    requiredSkills: ['Node.js', 'MongoDB', 'Express', 'REST API'],
    experienceLevel: 'Advanced',
    tags: ['backend', 'nodejs', 'startup'],
    timeCommitment: 'Part-time',
    status: 'open',
    postedBy: { _id: 'mock_user_4', name: 'StartupXYZ', email: 'startup@example.com' },
    views: 200,
    applications: 18,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: 'post_3',
    title: 'UI/UX Designer',
    company: 'Design Studio',
    description: 'Creative UI/UX designer needed for mobile app design projects.',
    location: 'Remote',
    type: 'Project-based',
    salary: '$30-40/hour',
    requiredSkills: ['Figma', 'Adobe XD', 'UI Design', 'UX Research'],
    experienceLevel: 'Intermediate',
    tags: ['design', 'ui-ux', 'mobile'],
    timeCommitment: 'Flexible',
    status: 'open',
    postedBy: { _id: 'mock_user_3', name: 'TechStart Inc.', email: 'techstart@example.com' },
    views: 180,
    applications: 15,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Initialize mock data on server start (only if MongoDB is connected)
mongoose.connection.once('open', () => {
  console.log('🔄 MongoDB connection ready, initializing mock data...');
  setTimeout(initializeMockData, 1000);
});

app.listen(PORT, () => {
  console.log(`\n🚀 Server is running on port ${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
  
  if (isMockMode()) {
    console.log(`\n✨ MOCK MODE ENABLED (No MongoDB required!)`);
    console.log(`📝 You can login with these test accounts:`);
    console.log(`   Student: john@example.com / password123`);
    console.log(`   Student: jane@example.com / password123`);
    console.log(`   Employer: techstart@example.com / password123`);
    console.log(`   Employer: startup@example.com / password123\n`);
  } else {
    console.log(`✅ MongoDB Connected - Using Database Mode\n`);
  }
});

