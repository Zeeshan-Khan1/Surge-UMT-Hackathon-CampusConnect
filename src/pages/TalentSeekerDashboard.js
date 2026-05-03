import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Briefcase,
  MapPin,
  DollarSign,
  Heart,
  MessageCircle,
  Search,
  Filter,
  Bell,
  LogOut,
  Menu,
  X,
  Settings,
  Star,
  Users,
  TrendingUp,
  Zap,
  CheckCircle,
  Clock,
} from 'lucide-react';

const TalentSeekerDashboard = () => {
  const { currentUser, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const [opportunities, setOpportunities] = useState([
    {
      id: 1,
      title: 'Mobile App Development',
      company: 'StartUp XYZ',
      type: 'Project',
      location: 'Remote',
      salary: '$500-1000',
      skills: ['React Native', 'Firebase', 'JavaScript'],
      matchScore: 95,
      views: 245,
      postedDays: 2,
      description: 'We are looking for an experienced mobile developer...'
    },
    {
      id: 2,
      title: 'UI/UX Design Internship',
      company: 'Tech Company ABC',
      type: 'Internship',
      location: 'On-site',
      salary: 'Internship',
      skills: ['Figma', 'UI Design', 'Prototyping'],
      matchScore: 87,
      views: 156,
      postedDays: 5,
      description: 'Join our design team for an exciting 3-month internship...'
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      company: 'Tech Startup',
      type: 'Job',
      location: 'Hybrid',
      salary: '$2000-3000/month',
      skills: ['MERN', 'Node.js', 'React', 'MongoDB'],
      matchScore: 92,
      views: 312,
      postedDays: 1,
      description: 'Looking for a full stack developer to build our platform...'
    },
    {
      id: 4,
      title: 'Data Science Competition',
      company: 'AI Innovation Hub',
      type: 'Competition',
      location: 'Online',
      salary: 'Prize Pool: $5000',
      skills: ['Python', 'Machine Learning', 'Data Analysis'],
      matchScore: 78,
      views: 89,
      postedDays: 3,
      description: 'Build AI models to solve real-world problems...'
    },
  ]);

  const stats = [
    { label: 'Applications Sent', value: 12, icon: Send, color: 'blue' },
    { label: 'Saved Jobs', value: savedJobs.size, icon: Heart, color: 'purple' },
    { label: 'Profile Views', value: 248, icon: Users, color: 'green' },
    { label: 'Match Score', value: '89%', icon: TrendingUp, color: 'orange' },
  ];

  const toggleSaveJob = (id) => {
    const newSavedJobs = new Set(savedJobs);
    if (newSavedJobs.has(id)) {
      newSavedJobs.delete(id);
    } else {
      newSavedJobs.add(id);
    }
    setSavedJobs(newSavedJobs);
  };

  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'high';
    if (score >= 75) return 'medium';
    return 'low';
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const filteredOpportunities = opportunities.filter(opp => {
    if (selectedFilter !== 'all' && opp.type.toLowerCase() !== selectedFilter.toLowerCase()) {
      return false;
    }
    return opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           opp.company.toLowerCase().includes(searchTerm.toLowerCase());
  });

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
                  <p className="text-xs text-gray-400">Talent Seeker Dashboard</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden sm:flex items-center bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                <Search className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search opportunities..."
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
                  <p className="text-xs text-gray-400">Seeker</p>
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
                <span>Browse Jobs</span>
              </div>
              <div className="nav-item">
                <Heart className="w-5 h-5" />
                <span>Saved Jobs ({savedJobs.size})</span>
              </div>
              <div className="nav-item">
                <CheckCircle className="w-5 h-5" />
                <span>Applications</span>
              </div>
              <div className="nav-item">
                <MessageCircle className="w-5 h-5" />
                <span>Messages</span>
              </div>
            </nav>

            <div className="border-t border-slate-700 pt-6 space-y-3">
              <h4 className="text-xs uppercase font-semibold text-gray-400 px-2">Filter by Type</h4>
              <button
                onClick={() => setSelectedFilter('all')}
                className={`nav-item w-full text-left ${selectedFilter === 'all' ? 'active' : ''}`}
              >
                All Opportunities
              </button>
              <button
                onClick={() => setSelectedFilter('job')}
                className={`nav-item w-full text-left ${selectedFilter === 'job' ? 'active' : ''}`}
              >
                Jobs
              </button>
              <button
                onClick={() => setSelectedFilter('internship')}
                className={`nav-item w-full text-left ${selectedFilter === 'internship' ? 'active' : ''}`}
              >
                Internships
              </button>
              <button
                onClick={() => setSelectedFilter('project')}
                className={`nav-item w-full text-left ${selectedFilter === 'project' ? 'active' : ''}`}
              >
                Projects
              </button>
            </div>

            <div className="border-t border-slate-700 pt-6 space-y-2">
              <div className="nav-item">
                <Settings className="w-5 h-5" />
                <span>Profile</span>
              </div>
              <button
                onClick={() => switchRole('finder')}
                className="nav-item w-full text-left"
              >
                <Briefcase className="w-5 h-5" />
                <span>Switch to Finder</span>
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
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Find Your Next Opportunity</h2>
                  <p className="text-gray-300">Discover opportunities perfectly matched to your skills</p>
                </div>
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm font-medium">Premium Matches</span>
                </div>
              </div>
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

            {/* Opportunities Section */}
            <div className="space-y-6">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <h3 className="text-2xl font-bold">Available Opportunities</h3>
                <div className="flex gap-2">
                  <div className="hidden sm:flex items-center bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2">
                    <Search className="w-4 h-4 text-gray-500 mr-2" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-transparent outline-none text-sm w-32"
                    />
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="p-2 hover:bg-slate-800/50 rounded-lg transition border border-slate-700"
                  >
                    <Filter className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Opportunities List */}
              <div className="grid gap-6">
                {filteredOpportunities.length > 0 ? (
                  filteredOpportunities.map((opp) => (
                    <div key={opp.id} className="job-card">
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-xl font-bold">{opp.title}</h4>
                              <span className={`match-score ${getMatchScoreColor(opp.matchScore)}`}>
                                <Star className="w-4 h-4 fill-current" />
                                {opp.matchScore}% Match
                              </span>
                            </div>
                            <p className="text-gray-400">{opp.company}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => toggleSaveJob(opp.id)}
                              className={`p-2 rounded-lg transition ${
                                savedJobs.has(opp.id)
                                  ? 'bg-red-500/20 text-red-400'
                                  : 'hover:bg-slate-700 text-gray-400'
                              }`}
                            >
                              <Heart className={`w-5 h-5 ${savedJobs.has(opp.id) ? 'fill-current' : ''}`} />
                            </button>
                            <button className="p-2 hover:bg-slate-700 rounded-lg transition">
                              <MessageCircle className="w-5 h-5 text-blue-400" />
                            </button>
                          </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-slate-700">
                          <div className="flex items-center gap-2 text-sm">
                            <Briefcase className="w-4 h-4 text-gray-500" />
                            <span>{opp.type}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span>{opp.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="w-4 h-4 text-gray-500" />
                            <span>{opp.salary}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span>{opp.postedDays}d ago</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-400 text-sm">{opp.description}</p>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2">
                          {opp.skills.map((skill, idx) => (
                            <span key={idx} className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs text-blue-300">
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Action Button */}
                        <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition transform hover:-translate-y-0.5">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <div className="empty-state-icon">🔍</div>
                    <h4 className="text-lg font-semibold mb-2">No opportunities found</h4>
                    <p>Try adjusting your filters or search terms</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Icon component for Send
const Send = () => <Briefcase className="w-6 h-6" />;

export default TalentSeekerDashboard;
