import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Plus,
  Briefcase,
  Eye,
  Users,
  Edit,
  Trash2,
  Bell,
  LogOut,
  Search,
  TrendingUp,
  Menu,
  X,
  Settings,
  ChevronDown,
  Star,
  MapPin,
  Clock,
  DollarSign,
} from 'lucide-react';

const TalentFinderDashboard = () => {
  const { currentUser, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const [showPostForm, setShowPostForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Mobile App Development',
      type: 'Project',
      applicants: 12,
      views: 245,
      status: 'open',
      skills: ['React Native', 'Firebase'],
      salary: '$500-1000'
    },
    {
      id: 2,
      title: 'UI/UX Designer Needed',
      type: 'Job',
      applicants: 8,
      views: 156,
      status: 'in-progress',
      skills: ['Figma', 'UI Design'],
      salary: 'Part-time'
    },
  ]);

  const stats = [
    { label: 'Total Posts', value: posts.length, icon: Briefcase, color: 'blue' },
    { label: 'Applications', value: posts.reduce((a, b) => a + b.applicants, 0), icon: Users, color: 'purple' },
    { label: 'Total Views', value: posts.reduce((a, b) => a + b.views, 0), icon: Eye, color: 'green' },
    { label: 'Active Posts', value: posts.filter(p => p.status === 'open').length, icon: TrendingUp, color: 'orange' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleDeletePost = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header sticky top-0 z-40 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 hover:bg-slate-800/50 rounded-lg transition"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">CampusConnect</h1>
                  <p className="text-xs text-gray-400">Employer Dashboard</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden sm:flex items-center bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                <Search className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent outline-none text-sm w-48"
                />
              </div>

              <button className="relative p-2 hover:bg-slate-800/50 rounded-lg transition">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium">{currentUser?.email?.split('@')[0] || 'User'}</p>
                  <p className="text-xs text-gray-400">Employer</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold">
                  {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Sidebar */}
        <aside className={`dashboard-sidebar fixed md:relative w-64 h-screen transition-all duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} z-30 overflow-y-auto`}>
          <div className="p-6 space-y-8">
            <nav className="space-y-2">
              <div className="nav-item active">
                <Briefcase className="w-5 h-5" />
                <span>Dashboard</span>
              </div>
              <div className="nav-item">
                <Users className="w-5 h-5" />
                <span>Applicants</span>
              </div>
              <div className="nav-item">
                <TrendingUp className="w-5 h-5" />
                <span>Analytics</span>
              </div>
              <div className="nav-item">
                <Bell className="w-5 h-5" />
                <span>Messages</span>
              </div>
            </nav>

            <div className="border-t border-slate-700 pt-6 space-y-2">
              <div className="nav-item">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </div>
              <button
                onClick={() => switchRole('seeker')}
                className="nav-item w-full text-left"
              >
                <Users className="w-5 h-5" />
                <span>Switch to Seeker</span>
              </button>
              <button
                onClick={handleLogout}
                className="nav-item w-full text-left hover:text-red-400"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-2">Welcome back, Talent Finder!</h2>
              <p className="text-gray-300">Manage your job posts and connect with top talent</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="stat-card">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </div>
                      <div className={`stat-icon ${stat.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Posts Section */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Your Job Posts</h3>
                <button
                  onClick={() => setShowPostForm(!showPostForm)}
                  className="btn-primary"
                >
                  <Plus className="w-5 h-5" />
                  Create New Post
                </button>
              </div>

              {/* Create Post Form */}
              {showPostForm && (
                <div className="modal-overlay" onClick={() => setShowPostForm(false)}>
                  <div className="modal-content p-8" onClick={(e) => e.stopPropagation()}>
                    <h3 className="text-2xl font-bold mb-6">Create New Job Post</h3>
                    <form className="space-y-4">
                      <div className="form-group">
                        <label className="form-label">Job Title</label>
                        <input type="text" placeholder="e.g., React Developer" className="form-input" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea placeholder="Describe the opportunity..." className="form-textarea"></textarea>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                          <label className="form-label">Job Type</label>
                          <select className="form-select">
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Project</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Salary</label>
                          <input type="text" placeholder="e.g., $1000/month" className="form-input" />
                        </div>
                      </div>
                      <div className="flex gap-3 justify-end pt-4">
                        <button type="button" onClick={() => setShowPostForm(false)} className="btn-secondary">
                          Cancel
                        </button>
                        <button type="submit" className="btn-primary">
                          Create Post
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Posts List */}
              <div className="grid gap-6">
                {posts.map((post) => (
                  <div key={post.id} className="job-card">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                            <Briefcase className="w-6 h-6 text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-lg font-bold">{post.title}</h4>
                              <span className={`badge-status ${post.status}`}>{post.status}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {post.skills.map((skill, idx) => (
                                <span key={idx} className="px-2 py-1 bg-slate-700/50 rounded text-xs text-gray-300">
                                  {skill}
                                </span>
                              ))}
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm text-gray-400">
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {post.applicants} Applicants
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {post.views} Views
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                {post.salary}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 md:flex-col">
                        <button className="p-2 hover:bg-slate-700 rounded-lg transition">
                          <Edit className="w-5 h-5 text-blue-400" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-2 hover:bg-slate-700 rounded-lg transition"
                        >
                          <Trash2 className="w-5 h-5 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TalentFinderDashboard;
