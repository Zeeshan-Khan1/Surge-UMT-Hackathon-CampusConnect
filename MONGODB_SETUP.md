# 🔧 MongoDB Setup - Quick Fix for Login Error

You're seeing this error: **"Operation `users.findOne()` buffering timed out after 10000ms"**

This means MongoDB is not connected. Here's how to fix it:

---

## ✅ EASIEST SOLUTION: MongoDB Atlas (FREE - 5 minutes)

### Step 1: Create Free MongoDB Atlas Account
1. Go to: **https://www.mongodb.com/cloud/atlas/register**
2. Click "Try Free" or "Sign Up"
3. Sign up with email or Google/GitHub

### Step 2: Create Free Cluster
1. Click **"Build a Database"**
2. Choose **FREE (M0) Shared** plan
3. Choose your region (closest to you)
4. Click **"Create"**
5. Wait 3-5 minutes for cluster to be created

### Step 3: Get Connection String
1. Click **"Connect"** button on your cluster
2. Choose **"Connect your application"**
3. Select **"Node.js"** and version **"5.5 or later"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 4: Setup Database User
1. Still in "Connect" dialog, click **"Create Database User"**
2. Enter username (e.g., `campusconnect`)
3. Enter password (remember it!)
4. Click **"Create Database User"**
5. Replace `<password>` in connection string with your password

### Step 5: Update Backend Configuration
1. Create file: `server/.env`
2. Add this line (replace with your connection string):
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/campusconnect?retryWrites=true&w=majority
   ```
   (Replace `username` and `password` with your database user credentials)

3. Replace `campusconnect` with your database name (or leave it)

### Step 6: Whitelist Your IP
1. In Atlas, go to **"Network Access"**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
   - Or add your current IP: `0.0.0.0/0`
4. Click **"Confirm"**

### Step 7: Restart Backend Server
1. Stop the backend (Ctrl+C in terminal)
2. Start it again:
   ```bash
   cd server
   npm start
   ```
3. You should see: `✅ MongoDB Connected successfully!`

### Step 8: Try Login Again
- Go back to `http://localhost:3000`
- Login with: `john@example.com` / `password123`

---

## 🔄 Alternative: Install MongoDB Locally

### Ubuntu/Debian:
```bash
# Update package list
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb

# Start MongoDB service
sudo systemctl start mongod
sudo systemctl enable mongod  # Auto-start on boot

# Verify it's running
sudo systemctl status mongod
```

The server should automatically connect to `mongodb://localhost:27017/campusconnect`

---

## ✅ Verify It's Working

After setup, restart backend and you should see:
```
✅ MongoDB Connected successfully!
🔄 MongoDB connection ready, initializing mock data...
Mock data initialized successfully!
```

Then login will work!

---

## 🆘 Still Having Issues?

1. **Check backend terminal** - Look for MongoDB connection messages
2. **Verify .env file** - Make sure `MONGODB_URI` is correct in `server/.env`
3. **Check IP whitelist** - In Atlas, make sure your IP is allowed
4. **Check password** - Make sure database user password is correct in connection string

---

**That's it! Once MongoDB is connected, everything will work perfectly! 🎉**

